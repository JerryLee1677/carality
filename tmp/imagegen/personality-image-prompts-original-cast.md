# Carality Personality Image Prompts V2

用于生成 16 种汽车人格的“原厂角色版”人物画像。

目标：
- 16 个角色来自同一个原创角色体系，同一画风、同一品牌语言、同一系列完成度
- 但每个角色都必须是不同的人，不是同一张脸换服装和姿势
- 尤其强化面部差异：脸型、眼型、眉形、鼻型、嘴型、发际线、发型轮廓都要不同
- 保持主流 MBTI 人格插画气质，适合人格测试结果页

统一要求：
- Aspect ratio: `4:5`
- Single character only
- Transparent background preferred
- If transparency is unavailable, use solid warm off-white background with very low saturation
- No text, no watermark, no logo, no car, no furniture, no scene storytelling

## Shared Master Prompt

```text
Create a premium mainstream-MBTI-style character illustration series for an automotive personality test. This is an original in-house character cast, not a repeated base model with costume swaps. All 16 characters must clearly belong to the same visual franchise and the same illustration pipeline, but every character must look like a different person with a distinct face and silhouette.

Style direction:
- clean contemporary MBTI personality illustration
- polished 2D digital illustration
- soft editorial finish
- gentle flat shading with subtle volume
- premium internet-product aesthetic
- highly readable silhouette
- friendly and expressive, but not childish
- semi-stylized proportions
- East Asian young adults, around 23-35
- low saturation but tasteful color blocking
- same rendering logic across the full series

Hard identity rules:
- do not reuse the same face template
- each character must have a different face shape, eye shape, eyebrow shape, nose shape, mouth shape, hairline, hairstyle silhouette, and body rhythm
- differences must be visible even if all clothing is removed from consideration
- build personality through facial structure first, styling second
- keep each character original and believable, like a proprietary cast from one brand universe

Output rules:
- single isolated character
- full body or three-quarter body
- transparent background preferred
- if no transparency, use solid warm off-white background only
- no environment scene
- no props unless they are tiny symbolic accessories
- no text
- no watermark
- no logo
```

## Shared Negative Prompt

```text
same face, identical face structure, clone character, costume swap only, same hairstyle with recolor only, repeated body template, realistic photo, 3d render, messy background, room scene, outdoor scene, car, furniture, text, watermark, logo, extra people, chibi, overly childish cartoon, anime exaggeration, hyper-detailed skin texture, horror, cyberpunk overload, fantasy armor, noisy composition, dark dramatic background
```

## 1. PSCV | Guardian | 务实省心型 | 守序顾家者

```text
[Shared Master Prompt]

Generate an original character named "Guardian" for PSCV, representing 务实省心型 and 守序顾家者. This character should feel like the most dependable member of the cast: calm, grounded, orderly, family-friendly, low-risk, easy to trust.

Make the face clearly unique within the series:
- broad oval-to-rectangular face
- straight calm eyebrows with moderate thickness
- slightly narrow almond eyes, soft but alert
- medium straight nose with practical, unshowy structure
- closed relaxed mouth with a faint reassuring smile
- tidy natural hairline
- short clean hair or medium-length neatly tucked hair, silhouette compact and balanced

Body and styling:
- average build, stable center of gravity, posture that feels reliable rather than stylish
- quiet practical outfit layering, understated jacket or knit outerwear
- palette anchored in warm gray, beige, muted olive, subdued navy
- shoes practical and grounded

Pose and expression:
- upright but relaxed
- one hand naturally lowered, the other near chest or lightly open
- expression should communicate “you can count on me”

Important:
- make Guardian look distinctly older and steadier than Explorer
- do not make the face glamorous, sharp, or luxury-coded
- character identity must read as dependable even in silhouette only

Negative prompt:
[Shared Negative Prompt]
```

## 2. PSCB | Steward | 体面务实型 | 稳妥掌舵者

```text
[Shared Master Prompt]

Generate an original character named "Steward" for PSCB, representing 体面务实型 and 稳妥掌舵者. This character is practical but more socially polished than Guardian, with mature dignity, proper taste, and quiet authority.

Make the face clearly unique within the series:
- longer face with slightly lifted cheek line
- clean arched brows, more refined than Guardian
- eyes slightly longer and more observant, with restrained social confidence
- nose more defined and elegant
- lips thinner, composed, with a courteous half-smile
- clean high hairline or precisely shaped side part
- hairstyle silhouette refined and controlled, not playful

Body and styling:
- straight balanced posture, tasteful smart-casual tailoring
- subtle mature elegance, no flamboyance
- palette anchored in camel, charcoal, muted blue, soft taupe
- optional understated watch or tiny metallic detail

Pose and expression:
- composed stance, mild social authority
- one arm bent with stable controlled gesture
- expression proper, decent, and reassuring

Important:
- Steward must not look like Guardian with better clothes
- face should feel more socially polished, more status-aware, and more composed
- avoid youthful playfulness or obvious performance energy

Negative prompt:
[Shared Negative Prompt]
```

## 3. PSDV | Driver | 理性驾趣型 | 克制驾驶者

```text
[Shared Master Prompt]

Generate an original character named "Driver" for PSDV, representing 理性驾趣型 and 克制驾驶者. This character values driving pleasure and response, but stays rational, measured, and unsentimental.

Make the face clearly unique within the series:
- slightly lean diamond-shaped face
- straighter lower jaw than Guardian
- focused low-set brows
- sharper monolid or near-monolid eyes with efficient intensity
- narrower nose bridge
- firmer mouth line, almost neutral expression
- asymmetrical fringe or hair silhouette with subtle motion

Body and styling:
- lean athletic build, compact efficient body rhythm
- modern casual outerwear with subtle performance cues
- palette anchored in slate blue, graphite, dark green, muted off-white
- clothing should look functional, trimmed, and mobile

Pose and expression:
- slight forward lean, ready-to-move posture
- one foot turned out as if about to step
- expression intelligent, focused, and disciplined rather than aggressive

Important:
- Driver should feel more kinetic than Guardian and Steward
- but not as high-status or forceful as Commander
- facial tension should come from focus, not arrogance

Negative prompt:
[Shared Negative Prompt]
```

## 4. PSDB | Commander | 克制性能型 | 分寸掌控者

```text
[Shared Master Prompt]

Generate an original character named "Commander" for PSDB, representing 克制性能型 and 分寸掌控者. This character combines performance appetite, composure, self-control, and a quiet sense of brand power.

Make the face clearly unique within the series:
- strong angular face with more prominent jaw
- deep-set eyes
- sharper brows with controlled authority
- defined nose bridge and cleaner facial planes
- slightly compressed mouth with minimal smile
- mature hairline and structured hairstyle silhouette, sharper than Driver

Body and styling:
- taller, stronger body rhythm than Driver
- tailored structured outfit, performance-luxury undertone
- palette anchored in charcoal, steel gray, muted burgundy, black
- silhouette should feel commanding even without props

Pose and expression:
- planted stance, shoulders open
- chin slightly raised
- restrained hand gesture, almost like giving direction
- expression cool, measured, and composed

Important:
- Commander must not read as villainous or coldly hostile
- he should feel controlled and high-standard, not theatrical
- facial structure should be clearly distinct from Driver and Executive

Negative prompt:
[Shared Negative Prompt]
```

## 5. PQCV | Keeper | 品质实用型 | 品质守护者

```text
[Shared Master Prompt]

Generate an original character named "Keeper" for PQCV, representing 品质实用型 and 品质守护者. This character values quality, comfort, finish, and reliability, but remains grounded and practical.

Make the face clearly unique within the series:
- softer rounded-square face
- gentle medium brows
- warm rounded almond eyes
- softly shaped nose with mild refinement
- fuller mouth with a small thoughtful smile
- softly curved hairline
- hairstyle silhouette smooth and calm, not sharp

Body and styling:
- balanced medium build, slightly softer body rhythm than Guardian
- refined but wearable outfit, premium basics
- palette anchored in cream, soft brown, stone gray, muted moss
- textures should suggest comfort and good materials, not luxury showmanship

Pose and expression:
- calm symmetrical stance
- hands relaxed, considerate posture
- expression warm, perceptive, and quietly discerning

Important:
- Keeper should look more softness-and-quality coded than Guardian
- but less elite or socially polished than Curator
- face must read as “caring and tasteful,” not cute or glamorous

Negative prompt:
[Shared Negative Prompt]
```

## 6. PQCB | Curator | 成熟品质型 | 品位经营者

```text
[Shared Master Prompt]

Generate an original character named "Curator" for PQCB, representing 成熟品质型 and 品位经营者. This character is tasteful, composed, mature, and quietly elevated, with strong lifestyle curation energy.

Make the face clearly unique within the series:
- elegant long oval face
- clean lifted brows, more shaped than Keeper
- longer expressive eyes with social intelligence
- refined nose and cheek structure
- composed lips, subtle reserved smile
- well-defined hairline
- hairstyle silhouette polished, controlled, and slightly editorial

Body and styling:
- poised upright body rhythm, neither soft nor athletic
- premium smart-casual outfit with curation energy
- palette anchored in taupe, espresso, muted gold, soft charcoal
- details should feel selected, not flashy

Pose and expression:
- elegant standing pose with one refined hand gesture
- expression observant, tasteful, lightly reserved

Important:
- Curator should not read as simply a dressed-up Keeper
- face should be more socially aware, more refined, and more selective
- avoid obvious executive power or youthful playfulness

Negative prompt:
[Shared Negative Prompt]
```

## 7. PQDV | Performer | 精致驾控型 | 质感驾驭者

```text
[Shared Master Prompt]

Generate an original character named "Performer" for PQDV, representing 精致驾控型 and 质感驾驭者. This character is precise, polished, and enjoys the tactile quality of driving and well-executed products.

Make the face clearly unique within the series:
- compact V-shaped face
- taut sleek brow shape
- bright focused eyes, more precise than Driver
- neat straight nose
- defined lips with subtle confidence
- sharp clean hairline
- hairstyle silhouette sleek, technical, and slightly fashion-forward

Body and styling:
- lean controlled build, more refined than sporty
- fitted modern outfit with clean lines
- palette anchored in steel gray, deep teal, off-white, muted blue
- silhouette should feel premium, efficient, finished

Pose and expression:
- slight diagonal body angle
- poised, balanced, controlled movement
- expression self-assured, refined, concentrated

Important:
- Performer should feel more polished and premium than Driver
- but less forceful than Commander, less expressive than Signature
- face should read as “precision” rather than “speed”

Negative prompt:
[Shared Negative Prompt]
```

## 8. PQDB | Signature | 格调性能型 | 格调表达者

```text
[Shared Master Prompt]

Generate an original character named "Signature" for PQDB, representing 格调性能型 and 格调表达者. This character is expressive, stylish, elevated, and performance-aware, with strong design taste and personal signature.

Make the face clearly unique within the series:
- high-fashion heart-to-oval face
- expressive sculpted brows
- eyes more charismatic and socially magnetic than Performer
- nose elegant and slightly sharper
- lips clearly shaped with a subtle knowing smile
- distinctive hairline and memorable hairstyle silhouette

Body and styling:
- elegant elongated body rhythm
- premium editorial clothing with strong silhouette and restraint
- palette anchored in deep wine red, black, metallic gray, muted ivory
- this character should look like the most design-conscious in the upper-middle band

Pose and expression:
- stylish asymmetrical pose
- attitude visible in the neck, shoulders, and hand positioning
- expression calm, confident, unmistakably tasteful

Important:
- Signature must not look like Iconic-lite
- should feel premium and expressive, but not flagship or overpowering
- face must be distinct enough to anchor a “brand taste” identity

Negative prompt:
[Shared Negative Prompt]
```

## 9. ESCV | Companion | 感受家用型 | 温和陪伴者

```text
[Shared Master Prompt]

Generate an original character named "Companion" for ESCV, representing 感受家用型 and 温和陪伴者. This character is emotionally warm, comforting, approachable, and deeply easy to be around.

Make the face clearly unique within the series:
- soft rounded face
- gentle curved brows
- larger kind eyes with visible emotional openness
- short soft nose
- fuller smiling mouth
- natural low-contrast facial geometry
- soft hairline and comfortable hairstyle silhouette

Body and styling:
- relaxed body rhythm with emotional openness
- cozy casual outfit
- palette anchored in soft cream, dusty blue, pale green, warm gray
- silhouette should feel inviting and safe

Pose and expression:
- open welcoming pose
- arms or hands slightly extended in a gentle gesture
- expression warm, caring, emotionally present

Important:
- Companion must not become childish or overly cute
- should feel like an adult with warmth, not a mascot
- face should be the emotional opposite of Commander

Negative prompt:
[Shared Negative Prompt]
```

## 10. ESCB | Charmer | 感性体面型 | 氛围魅力者

```text
[Shared Master Prompt]

Generate an original character named "Charmer" for ESCB, representing 感性体面型 and 氛围魅力者. This character is graceful, attractive, emotionally polished, and socially easy, with strong atmosphere-making energy.

Make the face clearly unique within the series:
- elegant oval face
- softly lifted brows
- expressive eyes with social warmth and polish
- refined nose
- shaped lips with natural charm
- graceful hairline
- hairstyle silhouette smooth, attractive, and memorable without excess

Body and styling:
- relaxed, poised, socially polished body rhythm
- refined soft-fashion styling
- palette anchored in blush beige, smoky rose, champagne gray, muted cocoa
- should feel attractive in a calm, human way

Pose and expression:
- slightly tilted head or soft hand gesture
- expression warm, smooth, inviting, charming

Important:
- Charmer should feel more socially luminous than Companion
- but less luxury-coded than Curator or Executive
- avoid glam cliché or influencer excess

Negative prompt:
[Shared Negative Prompt]
```

## 11. ESDV | Explorer | 玩乐超值型 | 乐趣探索者

```text
[Shared Master Prompt]

Generate an original character named "Explorer" for ESDV, representing 玩乐超值型 and 乐趣探索者. This character is curious, fresh, energetic, experience-first, and value-aware rather than brand-obsessed.

Make the face clearly unique within the series:
- youthful asymmetrical face geometry
- lively brows with motion
- bright curious eyes, slightly wider apart
- smaller lively nose
- expressive smile, more visible teeth or grin shape than most others
- dynamic hairline
- hairstyle silhouette energetic, slightly unruly, adventurous

Body and styling:
- lighter youthful body rhythm
- modern casual outfit with movement and color accents
- palette anchored in teal, burnt orange, off-white, muted slate
- should feel mobile and fresh

Pose and expression:
- active lightly bouncing stance
- curious head angle or step-forward posture
- expression bright, playful, discovery-oriented

Important:
- Explorer must not look like Companion in sporty clothes
- face should read as curiosity and experimentation first
- avoid reckless rebellion; this is playful intelligence

Negative prompt:
[Shared Negative Prompt]
```

## 12. ESDB | Maverick | 外放驾趣型 | 个性冒险者

```text
[Shared Master Prompt]

Generate an original character named "Maverick" for ESDB, representing 外放驾趣型 and 个性冒险者. This character is bold, visible, rebellious, thrill-seeking, and magnetic, with strong personal statement energy.

Make the face clearly unique within the series:
- angular expressive face
- stronger brow tilt
- eyes sharper and more confrontational than Explorer
- nose straighter and more assertive
- mouth asymmetrical, confident, slightly provocative
- stronger hairline shape
- hairstyle silhouette bold, graphic, and attention-grabbing

Body and styling:
- dynamic body rhythm with clear visual attitude
- stronger fashion expression than any non-flagship extrovert
- palette anchored in black, electric yellow-green accents, muted red, dark gray
- silhouette must read instantly from far away

Pose and expression:
- stronger gesture and stance
- visible directional energy
- expression fearless, playful, slightly challenging

Important:
- Maverick should not become villain-coded or punk cliché
- should feel alive, stylish, disruptive, and charismatic
- face must clearly differ from Signature and Iconic

Negative prompt:
[Shared Negative Prompt]
```

## 13. EQCV | Planner | 高配舒享型 | 舒享规划者

```text
[Shared Master Prompt]

Generate an original character named "Planner" for EQCV, representing 高配舒享型 and 舒享规划者. This character is organized, comfort-oriented, system-loving, and appreciates technology that makes life smoother.

Make the face clearly unique within the series:
- calm rectangular-to-oval face
- even rational brows
- intelligent eyes with analytical steadiness
- clean moderate nose
- composed mouth with a small precise smile
- neat hairline
- hairstyle silhouette orderly and intelligent, not dramatic

Body and styling:
- composed symmetrical body rhythm
- clean modern outfit with system-minded neatness
- palette anchored in pale gray, soft blue, muted silver, cool beige
- should look comfort-tech oriented rather than luxury or speed oriented

Pose and expression:
- symmetrical or near-symmetrical pose
- subtle thoughtful hand gesture
- expression capable, smart, smooth, calm

Important:
- Planner should not read as Executive with less money
- must feel more systems-and-comfort driven, less social power driven
- face should read analytical but approachable

Negative prompt:
[Shared Negative Prompt]
```

## 14. EQCB | Executive | 豪华舒享型 | 从容主理者

```text
[Shared Master Prompt]

Generate an original character named "Executive" for EQCB, representing 豪华舒享型 and 从容主理者. This character projects prestige, control, maturity, and refined comfort, with effortless authority rather than flashy power.

Make the face clearly unique within the series:
- long structured face
- composed high-control brows
- eyes stable, calm, socially dominant without aggression
- refined prominent nose
- restrained mouth with confident composure
- mature hairline
- hairstyle silhouette polished, executive, and highly controlled

Body and styling:
- poised premium body rhythm
- tailored luxury-smart outfit
- palette anchored in deep navy, charcoal, ivory, muted gold-gray
- should feel higher-status than Curator and more composed than Commander

Pose and expression:
- upright poised stance
- minimal commanding gesture
- expression calm, assured, high-level, never rushed

Important:
- Executive must feel luxurious and socially authoritative
- not sharp-performance like Commander
- not expressive-fashion like Signature or Iconic

Negative prompt:
[Shared Negative Prompt]
```

## 15. EQDV | Visionary | 科技驾趣型 | 先锋驾控者

```text
[Shared Master Prompt]

Generate an original character named "Visionary" for EQDV, representing 科技驾趣型 and 先锋驾控者. This character is future-facing, sharp, energetic, high-performance, and excited by technology and momentum.

Make the face clearly unique within the series:
- sharper futuristic facial planes
- precise angled brows
- bright focused eyes with forward-looking intensity
- clean narrow nose bridge
- subtle confident smile with edge
- crisp hairline
- hairstyle silhouette modern, sleek, and slightly experimental

Body and styling:
- agile elevated body rhythm
- contemporary technical-fashion outfit
- palette anchored in cool silver, electric blue, graphite, muted white
- should feel more futuristic than Performer and more movement-oriented than Planner

Pose and expression:
- elegant dynamic pose with forward momentum
- alert shoulders and neck line
- expression visionary, confident, excited by possibility

Important:
- Visionary should not become sci-fi costume cosplay
- keep it human, premium, current, and near-future
- face must feel distinct from Driver and Performer

Negative prompt:
[Shared Negative Prompt]
```

## 16. EQDB | Iconic | 旗舰表达型 | 旗舰风格者

```text
[Shared Master Prompt]

Generate an original character named "Iconic" for EQDB, representing 旗舰表达型 and 旗舰风格者. This character is the flagship of the cast: high-presence, high-status, highly memorable, expressive, and unmistakably top-tier.

Make the face clearly unique within the series:
- sculptural face with strongest visual identity in the set
- boldly shaped brows
- striking eyes with cool charisma
- elegant prominent nose
- clearly designed mouth shape, memorable and editorial
- distinctive hairline
- hairstyle silhouette iconic, elevated, and impossible to confuse with any other character

Body and styling:
- premium elongated body rhythm
- luxury editorial outfit with high-finish silhouette
- palette anchored in black, platinum, deep blue, muted metallic tones
- every line should feel flagship-level and unmistakable

Pose and expression:
- high-presence fashion pose
- elegant but strong stance
- expression cool, aspirational, magnetic, unforgettable

Important:
- Iconic must feel like the visual apex of the series
- not merely luxurious, but identity-defining
- absolutely avoid looking like Signature in more expensive clothes

Negative prompt:
[Shared Negative Prompt]
```
