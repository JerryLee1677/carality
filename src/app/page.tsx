import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="hero-home">
      <section className="shell hero-home__section">
        <div className="hero-home__content">
          <p className="hero-home__eyebrow">Carality</p>
          <h1 className="hero-home__title">识别你的汽车人格</h1>
          <p className="hero-home__body">
            通过一组连续问题，先看清你真正重视的购车偏好，再理解什么样的选车方向更适合你。
          </p>
          <div className="hero-home__actions">
            <Button as={Link} href="/quiz" className="race-button race-button-primary px-7 py-4">
              开始测试
            </Button>
            <Button as={Link} href="/guides" className="race-button race-button-ghost px-7 py-4">
              浏览购车指南
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
