# Design System — Shadow-Agent Dojo

## Visual direction
A modern enterprise learning and AI-assistance platform: energetic enough for training and gamification, restrained enough for company administration and performance analytics. Use a dark ink/navy foundation, electric violet for AI intelligence, and aqua/teal for progress and primary actions. MVP can support both light admin surfaces and dark/high-contrast training surfaces only if implementation scope allows; start with a consistent light default and a defined dark Dojo session surface.

## Brand palette
| Token | Hex | Usage |
|---|---|---|
| Midnight | `#111827` | Main dark text/navigation |
| Navy | `#1E2A4A` | Brand/deep surfaces |
| Violet | `#6D5CE8` | AI/Dojo brand accent |
| Violet soft | `#EEEAFE` | AI suggestion background |
| Aqua | `#18B6A4` | Primary action/progress |
| Aqua deep | `#0B897D` | Hover/active |
| Cloud | `#F5F7FB` | App background |
| White | `#FFFFFF` | Cards/panels |
| Slate | `#64748B` | Secondary text |
| Border | `#E2E8F0` | Dividers |

## Semantic colors
| Token | Hex | Meaning |
|---|---|---|
| Success | `#16A36A` | Completed / improved |
| Warning | `#D99322` | Attention / moderate risk |
| Danger | `#D84A4A` | Critical escalation / destructive |
| Info | `#3975C6` | Informational |
| Neutral | `#94A3B8` | Inactive / unknown |

Use text labels and icons alongside color. Sentiment colors must not imply certainty.

## Typography
Use Inter or Geist. Strong headings for admin, highly legible body text for chat. Use tabular numerals in analytics and XP. Suggested scale: display 32–40px, page title 24–30px, section 18–20px, body 14–16px, caption 12–13px.

## Layout and spacing
4px base spacing. Admin navigation fixed/collapsible; content grid uses generous whitespace. Cards radius 12–16px; controls 8–10px; mobile touch targets at least 44px. Avoid overuse of gradient/glass effects.

## Module accents
- Dojo: violet + aqua progress, scenario difficulty badge, clear session timer.
- Shadow: violet AI suggestion container with provenance/source chips; urgency uses semantic warning/danger.
- XP/rewards: aqua progress, gold accent reserved for achievement moments.
- Analytics: restrained palette, labeled charts, non-color differentiation.

## Component states
Buttons, forms, tables, cards, chat messages, upload status, session controls and socket states need default/hover/focus/pressed/disabled/loading/error/success variants as applicable. Provide motion reduction.

## Theme policy
Light surfaces for admin and general app. A controlled dark session experience may be used in the employee training chat, but do not build a full user-selectable theme system until the base UI is stable.
