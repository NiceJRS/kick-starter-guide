# Content Intake Template — KICK Guide
> Use this template for EVERY chapter submission to Claude Code.
> Fill ALL fields. Leave `""` if empty, never delete a field.
> Images go in `/public/images/ch{N}/` and reference by filename only.

---

## HOW TO USE

1. Copy the template below
2. Fill in TH and EN content (Gemini helps translate/write)
3. Add screenshot filenames under each step
4. Paste to Claude Code with the command:
   > "Build Chapter {N} from this intake form"

---

## TEMPLATE

```yaml
chapter:
  number: 1                          # Chapter number
  slug: "account-setup"              # URL slug (kebab-case, EN only)
  level: "beginner"                  # beginner | intermediate | pro
  title:
    th: "สมัครและตั้งค่าช่อง"
    en: "Account & Channel Setup"
  description:
    th: "วิธีสมัคร KICK และตั้งค่าช่องสตรีมของคุณตั้งแต่เริ่มต้น"
    en: "How to create your KICK account and set up your stream channel from scratch"
  estimated_time: "15 นาที / 15 mins"
  prerequisites: []                  # slug list of chapters that must be done first

sections:
  - id: "s1"
    title:
      th: "ชื่อ Section ภาษาไทย"
      en: "Section Title in English"
    steps:
      - step: 1
        title:
          th: "ชื่อ Step ไทย"
          en: "Step Title EN"
        content:
          th: |
            อธิบาย step นี้เป็นภาษาไทย
            ใส่ได้หลายบรรทัด
          en: |
            Explain this step in English.
            Multiple lines are fine.
        images:
          - filename: "s1-step1-screenshot.png"
            caption:
              th: "คำบรรยายภาพไทย"
              en: "Image caption EN"
        tip:
          th: ""           # optional — pro tip in Thai
          en: ""           # optional — pro tip in EN
        warning:
          th: ""           # optional — warning in Thai
          en: ""           # optional — warning in EN

      - step: 2
        title:
          th: ""
          en: ""
        content:
          th: |
            
          en: |
            
        images: []
        tip:
          th: ""
          en: ""
        warning:
          th: ""
          en: ""

  - id: "s2"
    title:
      th: ""
      en: ""
    steps: []

faq:
  - question:
      th: "คำถามที่พบบ่อย?"
      en: "Frequently asked question?"
    answer:
      th: "คำตอบภาษาไทย"
      en: "Answer in English"

related_chapters:
  - slug: "obs-studio"               # next logical chapter
  - slug: "kick-features"

external_links:
  - label: "KICK Official Help"
    url: "https://help.kick.com"
  - label: ""
    url: ""
```

---

## EXAMPLE — Filled Chapter 1 (partial)

```yaml
chapter:
  number: 1
  slug: "account-setup"
  level: "beginner"
  title:
    th: "สมัครและตั้งค่าช่อง"
    en: "Account & Channel Setup"
  description:
    th: "เริ่มต้นสตรีมบน KICK ด้วยการสมัครบัญชีและตั้งค่าช่องของคุณ"
    en: "Get started on KICK by creating your account and setting up your channel"
  estimated_time: "15 นาที / 15 mins"
  prerequisites: []

sections:
  - id: "s1"
    title:
      th: "สมัครบัญชี KICK"
      en: "Create Your KICK Account"
    steps:
      - step: 1
        title:
          th: "เข้าเว็บไซต์ KICK.com"
          en: "Go to KICK.com"
        content:
          th: |
            เปิดเบราว์เซอร์แล้วไปที่ kick.com
            คลิกปุ่ม "Sign Up" มุมบนขวา
          en: |
            Open your browser and go to kick.com
            Click the "Sign Up" button in the top right corner
        images:
          - filename: "s1-step1-homepage.png"
            caption:
              th: "หน้าแรกของ KICK.com"
              en: "KICK.com homepage"
        tip:
          th: "แนะนำให้สมัครผ่าน Google เพื่อความรวดเร็ว"
          en: "Recommended: sign up via Google for the fastest setup"
        warning:
          th: ""
          en: ""

      - step: 2
        title:
          th: "เลือกวิธีสมัคร"
          en: "Choose Sign Up Method"
        content:
          th: |
            มี 3 วิธีสมัคร:
            - Google (แนะนำ — เร็วสุด)
            - Email
            - Apple
          en: |
            3 sign up options:
            - Google (recommended — fastest)
            - Email
            - Apple
        images:
          - filename: "s1-step2-signup-options.png"
            caption:
              th: "ตัวเลือกการสมัครบัญชี"
              en: "Account sign up options"
        tip:
          th: ""
          en: ""
        warning:
          th: "ถ้าใช้ Email ต้องยืนยันอีเมลก่อนถึงจะใช้งานได้เต็มที่"
          en: "Email sign up requires email verification before full access"

faq:
  - question:
      th: "สมัครผ่าน Google แล้วยังต้องยืนยันอีเมลอีกไหม?"
      en: "Do I still need to verify email if I signed up with Google?"
    answer:
      th: "ไม่ต้องครับ Google OAuth ยืนยันตัวตนให้แล้ว"
      en: "No. Google OAuth handles verification automatically."

related_chapters:
  - slug: "obs-studio"

external_links:
  - label: "KICK Sign Up"
    url: "https://kick.com/register"
```

---

## IMAGE NAMING CONVENTION

```
/public/images/ch{N}/
  {sectionId}-step{N}-{description}.png

Examples:
  ch1/s1-step1-homepage.png
  ch1/s1-step2-signup-options.png
  ch2/s1-step1-obs-download.png
```

---

## QUICK CHECKLIST before submitting to Claude Code

- [ ] All TH and EN fields filled (no empty title/content)
- [ ] Images named correctly and placed in `/public/images/ch{N}/`
- [ ] At least 1 FAQ entry
- [ ] `related_chapters` points to next logical chapter
- [ ] `level` is correct (beginner / intermediate / pro)
