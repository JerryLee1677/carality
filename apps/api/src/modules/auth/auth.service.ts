import {
  constants,
  generateKeyPairSync,
  privateDecrypt,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../common/prisma/prisma.service";
import { SessionAuthService } from "../../common/auth/session-auth.service";

const DEFAULT_SCRYPT_N = 16384;
const DEFAULT_SCRYPT_R = 8;
const DEFAULT_SCRYPT_P = 1;
const DEFAULT_SCRYPT_KEYLEN = 32;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function decodePemFromBase64Env(name: string) {
  const value = process.env[name];
  if (!value) {
    return null;
  }

  try {
    return Buffer.from(value, "base64").toString("utf8");
  } catch {
    return null;
  }
}

function readEnvString(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : null;
}

function base64ToBuffer(value: string) {
  return Buffer.from(value, "base64");
}

function bufferToBase64(value: Buffer) {
  return value.toString("base64");
}

function encodePasswordHash(params: {
  n: number;
  r: number;
  p: number;
  saltB64: string;
  hashB64: string;
}) {
  return `scrypt$N=${params.n}$r=${params.r}$p=${params.p}$salt=${params.saltB64}$hash=${params.hashB64}`;
}

function parsePasswordHash(encoded: string) {
  const parts = encoded.split("$");
  if (parts.length < 6 || parts[0] !== "scrypt") {
    return null;
  }

  const n = Number.parseInt(parts[1]?.replace("N=", "") ?? "", 10);
  const r = Number.parseInt(parts[2]?.replace("r=", "") ?? "", 10);
  const p = Number.parseInt(parts[3]?.replace("p=", "") ?? "", 10);
  const saltB64 = parts[4]?.replace("salt=", "") ?? "";
  const hashB64 = parts[5]?.replace("hash=", "") ?? "";

  if (!Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(p)) {
    return null;
  }

  if (!saltB64 || !hashB64) {
    return null;
  }

  return {
    n,
    r,
    p,
    salt: base64ToBuffer(saltB64),
    hash: base64ToBuffer(hashB64),
  };
}

function verifyPasswordHash(encoded: string, password: string) {
  const parsed = parsePasswordHash(encoded);
  if (!parsed) {
    return false;
  }

  const derived = scryptSync(password, parsed.salt, parsed.hash.length, {
    N: parsed.n,
    r: parsed.r,
    p: parsed.p,
    maxmem: 64 * 1024 * 1024,
  });

  if (derived.length !== parsed.hash.length) {
    return false;
  }

  return timingSafeEqual(derived, parsed.hash);
}

function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, DEFAULT_SCRYPT_KEYLEN, {
    N: DEFAULT_SCRYPT_N,
    r: DEFAULT_SCRYPT_R,
    p: DEFAULT_SCRYPT_P,
    maxmem: 64 * 1024 * 1024,
  });

  return encodePasswordHash({
    n: DEFAULT_SCRYPT_N,
    r: DEFAULT_SCRYPT_R,
    p: DEFAULT_SCRYPT_P,
    saltB64: bufferToBase64(salt),
    hashB64: bufferToBase64(hash),
  });
}

type KeyPair = {
  publicKeyPem: string;
  privateKeyPem: string;
};

function loadOrGenerateKeyPair(): KeyPair {
  const privateKeyPem =
    decodePemFromBase64Env("AUTH_RSA_PRIVATE_KEY_B64") ??
    readEnvString("AUTH_RSA_PRIVATE_KEY_PEM");
  const publicKeyPem =
    decodePemFromBase64Env("AUTH_RSA_PUBLIC_KEY_B64") ??
    readEnvString("AUTH_RSA_PUBLIC_KEY_PEM");

  if (privateKeyPem && publicKeyPem) {
    return {
      privateKeyPem,
      publicKeyPem,
    };
  }

  const pair = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  return {
    publicKeyPem: pair.publicKey,
    privateKeyPem: pair.privateKey,
  };
}

@Injectable()
export class AuthService {
  private readonly keys: KeyPair;

  constructor(
    private readonly prisma: PrismaService,
    private readonly sessionAuth: SessionAuthService,
  ) {
    this.keys = loadOrGenerateKeyPair();
  }

  getPublicKeyPem() {
    return this.keys.publicKeyPem;
  }

  decryptPassword(encryptedPassword: string) {
    let cipherBytes: Buffer;
    try {
      cipherBytes = Buffer.from(encryptedPassword, "base64");
    } catch {
      throw new BadRequestException("Invalid encryptedPassword encoding");
    }

    try {
      const plain = privateDecrypt(
        {
          key: this.keys.privateKeyPem,
          padding: constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        cipherBytes,
      );
      return plain.toString("utf8");
    } catch {
      throw new BadRequestException("Failed to decrypt password");
    }
  }

  validateCredentialsInput(email: string, password: string) {
    if (!email || !email.includes("@")) {
      throw new BadRequestException("Invalid email");
    }

    if (!password || password.length < 8 || password.length > 72) {
      throw new BadRequestException("Password must be 8-72 characters");
    }
  }

  async register(email: string, encryptedPassword: string) {
    const normalizedEmail = normalizeEmail(email);
    const password = this.decryptPassword(encryptedPassword);
    this.validateCredentialsInput(normalizedEmail, password);

    const existing = await this.prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      select: {
        id: true,
      },
    });

    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const user = await this.prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashPassword(password),
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  async login(email: string, encryptedPassword: string) {
    const normalizedEmail = normalizeEmail(email);
    const password = this.decryptPassword(encryptedPassword);
    this.validateCredentialsInput(normalizedEmail, password);

    const user = await this.prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!verifyPasswordHash(user.passwordHash, password)) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const session = await this.sessionAuth.createSession(user.id);

    return {
      sessionToken: session.sessionToken,
      user: {
        id: user.id,
        email: user.email,
      },
      expiresAt: session.expiresAt,
    };
  }
}

