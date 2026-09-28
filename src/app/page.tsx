"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

function HeroVisual() {
  const { translations } = useLanguage();
  const copy = translations.home;

  return (
    <div className="home-hero__visual" aria-hidden="true">
      <div className="home-dashboard">
        <div className="home-dashboard__score">
          <svg viewBox="0 0 180 110" role="presentation">
            <path
              d="M16 96 A74 74 0 0 1 164 96"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M16 96 A74 74 0 0 1 139 45"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <line x1="90" y1="96" x2="126" y2="40" stroke="#1d1d1f" strokeWidth="6" strokeLinecap="round" />
            <circle cx="90" cy="96" r="10" fill="#1d1d1f" />
          </svg>
          <div className="home-dashboard__score-value">87</div>
          <div className="home-dashboard__score-label">{copy.matchScore}</div>
        </div>
        <div className="home-dashboard__metrics">
          <div className="home-dashboard__metric">
            <span>{copy.comfort}</span>
            <div className="home-dashboard__track">
              <div className="home-dashboard__fill" style={{ width: "72%" }} />
            </div>
          </div>
          <div className="home-dashboard__metric">
            <span>{copy.performance}</span>
            <div className="home-dashboard__track">
              <div className="home-dashboard__fill" style={{ width: "88%" }} />
            </div>
          </div>
          <div className="home-dashboard__metric">
            <span>{copy.efficiency}</span>
            <div className="home-dashboard__track">
              <div className="home-dashboard__fill" style={{ width: "64%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyIcon() {
  return (
    <svg viewBox="0 0 48 48" role="presentation" aria-hidden="true">
      <path
        d="M24 5l15 6v12c0 10-6.5 16.5-15 20-8.5-3.5-15-10-15-20V11l15-6z"
        fill="rgba(0,113,227,0.08)"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
      />
      <rect x="17" y="22" width="14" height="11" rx="3" fill="#fff" stroke="#1d1d1f" strokeWidth="2.5" />
      <path d="M20 22v-3a4 4 0 018 0v3" fill="none" stroke="#1d1d1f" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg viewBox="0 0 48 48" role="presentation" aria-hidden="true">
      <rect x="7" y="8" width="34" height="32" rx="6" fill="rgba(0,113,227,0.08)" stroke="var(--color-accent)" strokeWidth="2.5" />
      <path d="M15 31v-7M22 31V17M29 31v-11M36 31V13" stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  const { translations } = useLanguage();
  const copy = translations.home;

  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="shell home-hero__inner">
          <p className="home-hero__eyebrow">Carality</p>
          <h1 id="home-hero-title" className="home-hero__title">
            {copy.title}
          </h1>
          <p className="home-hero__body">
            {copy.body}
          </p>
          <div className="home-hero__actions">
            <Button as={Link} href="/quiz" className="home-button home-button--primary">
              {copy.primaryCta}
            </Button>
            <Button as={Link} href="/guides" className="home-button home-button--ghost">
              {copy.secondaryCta}
            </Button>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="home-feature" aria-labelledby="home-privacy-title">
        <div className="shell home-feature__inner">
          <PrivacyIcon />
          <h2 id="home-privacy-title">{copy.privacyTitle}</h2>
          <p>
            {copy.privacyBody}
          </p>
        </div>
      </section>

      <section className="home-feature home-feature--alt" aria-labelledby="home-data-title">
        <div className="shell home-feature__inner">
          <DataIcon />
          <h2 id="home-data-title">{copy.dataTitle}</h2>
          <p>{copy.dataBody}</p>
        </div>
      </section>

      <section className="home-preview" aria-labelledby="home-preview-title">
        <div className="shell home-preview__inner">
          <h2 id="home-preview-title">{copy.previewTitle}</h2>
          <p>{copy.previewBody}</p>
          <div className="home-preview__grid">
            <article className="home-preview__card">
              <span>{copy.personality}</span>
              <strong>{copy.adventurer}</strong>
            </article>
            <article className="home-preview__card">
              <span>{copy.matchScore}</span>
              <strong>92</strong>
            </article>
            <article className="home-preview__card">
              <span>{copy.topMatch}</span>
              <strong>{copy.sportSuv}</strong>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
