# Carality Personality Image Prompts

用于给 ChatGPT 逐条生成 16 张汽车人格人物画像。

建议统一要求：
- Aspect ratio: `4:5`
- Composition: `single character portrait`
- Background: `transparent background preferred`
- Fallback background: `solid warm off-white / low saturation beige`
- Keep same visual series across all 16 images

## Shared Base Prompt

```text
Create a single-character personality illustration in the style of mainstream MBTI character art, matching this reference style: geometric low-poly character design, faceted shapes, simplified angular body structure, soft flat shading, gentle pastel color blocking, playful but refined proportions, clean silhouette, highly readable personality expression, premium editorial illustration quality.

Strict requirements:
- single person only
- full body or three-quarter body character portrait
- isolated character
- transparent background preferred
- if transparent background is not possible, use a solid warm off-white background with very low saturation
- no environment scene
- no furniture
- no car
- no text
- no watermark
- no logo
- no extra objects unless they are very small symbolic accessories
- same consistent visual series across all 16 personalities

Character style:
- East Asian young adult, around 25-35
- fashionable contemporary clothing
- expressive pose
- friendly MBTI-style personality illustration
- low-saturation palette
- geometric faceted limbs, hair, and clothing
- cute but not childish
- stylish but not flashy
```

## Shared Negative Prompt

```text
realistic photo, 3d render, messy background, room scene, outdoor scene, car, furniture, text, watermark, logo, extra people, chibi, overly childish cartoon, anime face, hyper-detailed texture, horror, cyberpunk, fantasy armor, dramatic special effects, noisy composition, dark background
```

## 1. PSCV | Guardian | 务实省心型 | 守序顾家者

```text
[Shared Base Prompt]

Generate "Guardian" for PSCV, a practical, dependable, calm car personality.
Chinese archetype: 务实省心型.
Subtitle vibe: 守序顾家者.

Visual personality:
- steady, trustworthy, orderly
- gentle confident smile
- upright but relaxed posture
- clean short hair or tidy mid-length hair
- simple layered casual outfit
- colors: warm gray, beige, muted olive, soft navy
- practical shoes, clean styling
- subtle family-oriented warmth
- not showy, not aggressive

Pose:
- standing naturally, one hand relaxed, one hand slightly raised or resting near chest
- expression should feel reliable and reassuring

Overall impression:
stable, grounded, safe, responsible, easy to trust

Negative prompt:
[Shared Negative Prompt]
```

## 2. PSCB | Steward | 体面务实型 | 稳妥掌舵者

```text
[Shared Base Prompt]

Generate "Steward" for PSCB, a respectable, composed, mature car personality.
Chinese archetype: 体面务实型.
Subtitle vibe: 稳妥掌舵者.

Visual personality:
- practical but more refined
- socially appropriate, mature, dignified
- tailored smart-casual outfit
- colors: camel, charcoal, muted blue, warm taupe
- polished hair and neat silhouette
- understated sense of brand awareness

Pose:
- composed standing pose with quiet authority
- one arm slightly bent, posture balanced and stable
- confident but restrained expression

Overall impression:
reliable, decent, proper, polished, mature, socially comfortable

Negative prompt:
[Shared Negative Prompt]
```

## 3. PSDV | Driver | 理性驾趣型 | 克制驾驶者

```text
[Shared Base Prompt]

Generate "Driver" for PSDV, a rational but driving-loving car personality.
Chinese archetype: 理性驾趣型.
Subtitle vibe: 克制驾驶者.

Visual personality:
- focused, agile, self-controlled
- slightly sharper face and posture
- modern casual jacket or light performance-inspired fashion
- colors: slate blue, graphite, dark green, muted white
- lean, alert, efficient silhouette

Pose:
- slight forward energy, as if ready to move
- one foot angled outward, subtle motion in posture
- expression focused and intelligent, not wild

Overall impression:
precise, energetic, disciplined, fun but rational

Negative prompt:
[Shared Negative Prompt]
```

## 4. PSDB | Commander | 克制性能型 | 分寸掌控者

```text
[Shared Base Prompt]

Generate "Commander" for PSDB, a controlled performance-oriented car personality.
Chinese archetype: 克制性能型.
Subtitle vibe: 分寸掌控者.

Visual personality:
- strong self-control, premium confidence
- structured outfit with sharper tailoring
- colors: charcoal, black, muted burgundy, steel gray
- commanding geometric silhouette
- expression cool, measured, composed

Pose:
- planted stance, shoulders open, head slightly raised
- quiet leadership energy
- one hand relaxed, one hand slightly posed as if directing attention

Overall impression:
controlled power, strategy, discipline, restrained prestige

Negative prompt:
[Shared Negative Prompt]
```

## 5. PQCV | Keeper | 品质实用型 | 品质守护者

```text
[Shared Base Prompt]

Generate "Keeper" for PQCV, a quality-focused yet grounded car personality.
Chinese archetype: 品质实用型.
Subtitle vibe: 品质守护者.

Visual personality:
- warm, refined, attentive
- elegant but practical clothing
- colors: cream, soft brown, stone gray, muted moss
- soft geometric hair shape and gentle facial expression
- polished but approachable

Pose:
- calm balanced pose, slightly inward warmth
- arms relaxed, body language considerate and stable
- expression gentle, discerning, thoughtful

Overall impression:
refined, steady, reliable, tasteful, quietly premium

Negative prompt:
[Shared Negative Prompt]
```

## 6. PQCB | Curator | 成熟品质型 | 品位经营者

```text
[Shared Base Prompt]

Generate "Curator" for PQCB, a mature and tasteful car personality.
Chinese archetype: 成熟品质型.
Subtitle vibe: 品位经营者.

Visual personality:
- sophisticated, curated, composed
- premium smart-casual clothing
- colors: taupe, espresso, muted gold, soft charcoal
- more polished styling than Keeper
- tasteful, socially established energy

Pose:
- elegant upright pose
- refined hand gesture
- calm, observant, lightly reserved expression

Overall impression:
mature taste, polish, quality awareness, social ease, quiet luxury

Negative prompt:
[Shared Negative Prompt]
```

## 7. PQDV | Performer | 精致驾控型 | 质感驾驭者

```text
[Shared Base Prompt]

Generate "Performer" for PQDV, a precise and refined driving-oriented car personality.
Chinese archetype: 精致驾控型.
Subtitle vibe: 质感驾驭者.

Visual personality:
- poised, polished, technically confident
- sleek fitted clothing with clean geometry
- colors: steel gray, deep teal, crisp off-white, muted blue
- elegant proportions and more dynamic silhouette
- strong sense of control and finish quality

Pose:
- subtle performance posture, slightly angled body
- expression focused and self-assured
- controlled movement, no exaggerated action

Overall impression:
precision, refinement, confidence, premium driving feel

Negative prompt:
[Shared Negative Prompt]
```

## 8. PQDB | Signature | 格调性能型 | 格调表达者

```text
[Shared Base Prompt]

Generate "Signature" for PQDB, a stylish and expressive performance personality.
Chinese archetype: 格调性能型.
Subtitle vibe: 格调表达者.

Visual personality:
- fashionable, elevated, distinctive
- premium editorial outfit with strong silhouette
- colors: deep wine red, black, metallic gray, muted ivory
- cool confident face
- tasteful but expressive styling

Pose:
- stylish standing pose with clear attitude
- subtle asymmetry in body language
- elegant confidence, not loud

Overall impression:
taste, identity, premium motion, expressive quality, high completion

Negative prompt:
[Shared Negative Prompt]
```

## 9. ESCV | Companion | 感受家用型 | 温和陪伴者

```text
[Shared Base Prompt]

Generate "Companion" for ESCV, a warm and emotionally intuitive car personality.
Chinese archetype: 感受家用型.
Subtitle vibe: 温和陪伴者.

Visual personality:
- soft, kind, approachable
- cozy casual clothing
- colors: soft cream, dusty blue, pale green, warm gray
- rounded-friendly geometric feel within the low-poly style
- natural smile, open expression

Pose:
- friendly relaxed pose
- slightly open arms or gentle welcoming gesture
- body language soft and easy

Overall impression:
warmth, comfort, care, companionship, emotional safety

Negative prompt:
[Shared Negative Prompt]
```

## 10. ESCB | Charmer | 感性体面型 | 氛围魅力者

```text
[Shared Base Prompt]

Generate "Charmer" for ESCB, a graceful and emotionally polished car personality.
Chinese archetype: 感性体面型.
Subtitle vibe: 氛围魅力者.

Visual personality:
- socially attractive, elegant, emotionally expressive
- refined soft-fashion styling
- colors: blush beige, smoky rose, champagne gray, muted cocoa
- charming expression, relaxed poise
- pretty but not glamorous in an exaggerated way

Pose:
- soft stylish pose with a hint of charisma
- head tilt or light hand gesture
- expression warm, smooth, inviting

Overall impression:
charm, atmosphere, softness, beauty, likability, gentle status

Negative prompt:
[Shared Negative Prompt]
```

## 11. ESDV | Explorer | 玩乐超值型 | 乐趣探索者

```text
[Shared Base Prompt]

Generate "Explorer" for ESDV, a playful and value-conscious car personality.
Chinese archetype: 玩乐超值型.
Subtitle vibe: 乐趣探索者.

Visual personality:
- curious, energetic, youthful
- modern casual outfit with lively accents
- colors: teal, burnt orange, off-white, muted slate
- sharp lively eyes
- adventurous but smart

Pose:
- active, lightly dynamic pose
- playful balance in stance
- expression bright, curious, excited but not reckless

Overall impression:
fun, discovery, mobility, youthfulness, smart excitement

Negative prompt:
[Shared Negative Prompt]
```

## 12. ESDB | Maverick | 外放驾趣型 | 个性冒险者

```text
[Shared Base Prompt]

Generate "Maverick" for ESDB, a bold and visible car personality.
Chinese archetype: 外放驾趣型.
Subtitle vibe: 个性冒险者.

Visual personality:
- extroverted, rebellious, magnetic
- stronger fashion expression
- colors: black, electric yellow-green accents, muted red, dark gray
- striking angular silhouette
- more attitude than the others

Pose:
- confident, bold pose with clear personality
- stronger gesture, sharper stance
- expression fearless, playful, slightly provocative

Overall impression:
individuality, thrill, boldness, visibility, expressive freedom

Negative prompt:
[Shared Negative Prompt]
```

## 13. EQCV | Planner | 高配舒享型 | 舒享规划者

```text
[Shared Base Prompt]

Generate "Planner" for EQCV, a system-loving comfort-tech personality.
Chinese archetype: 高配舒享型.
Subtitle vibe: 舒享规划者.

Visual personality:
- intelligent, organized, efficient
- clean modern outfit
- colors: pale gray, soft blue, muted silver, cool beige
- calm analytical expression
- neat and highly ordered styling

Pose:
- composed symmetrical pose
- subtle thoughtful hand gesture
- expression should feel capable, smart, and smooth

Overall impression:
comfort, planning, order, intelligence, calm technology

Negative prompt:
[Shared Negative Prompt]
```

## 14. EQCB | Executive | 豪华舒享型 | 从容主理者

```text
[Shared Base Prompt]

Generate "Executive" for EQCB, a premium comfort and authority personality.
Chinese archetype: 豪华舒享型.
Subtitle vibe: 从容主理者.

Visual personality:
- stable authority, effortless luxury
- premium tailored outfit
- colors: deep navy, charcoal, ivory, muted gold-gray
- composed facial expression
- strong but smooth silhouette

Pose:
- poised standing pose
- minimal but commanding gesture
- expression calm, high-status, controlled

Overall impression:
executive calm, prestige, comfort, mature authority, refinement

Negative prompt:
[Shared Negative Prompt]
```

## 15. EQDV | Visionary | 科技驾趣型 | 先锋驾控者

```text
[Shared Base Prompt]

Generate "Visionary" for EQDV, a futuristic and high-energy car personality.
Chinese archetype: 科技驾趣型.
Subtitle vibe: 先锋驾控者.

Visual personality:
- forward-looking, sharp, innovative
- sleek contemporary fashion
- colors: cool silver, electric blue, graphite, muted white
- bright focused eyes
- precise geometric silhouette with futuristic flavor

Pose:
- dynamic but elegant pose
- slight forward motion and alertness
- expression confident, visionary, excited by the future

Overall impression:
innovation, speed, intelligence, future, precision, excitement

Negative prompt:
[Shared Negative Prompt]
```

## 16. EQDB | Iconic | 旗舰表达型 | 旗舰风格者

```text
[Shared Base Prompt]

Generate "Iconic" for EQDB, a flagship expressive premium personality.
Chinese archetype: 旗舰表达型.
Subtitle vibe: 旗舰风格者.

Visual personality:
- iconic, elite, unforgettable
- luxury editorial fashion styling
- colors: black, platinum, deep blue, muted metallic tones
- sculptural low-poly silhouette
- commanding and stylish face

Pose:
- high-presence fashion pose
- elegant but strong stance
- expression cool, aspirational, unmistakably premium

Overall impression:
flagship presence, status, identity, premium expression, unforgettable charisma

Negative prompt:
[Shared Negative Prompt]
```
