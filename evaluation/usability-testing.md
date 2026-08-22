# Usability Testing (V1)

Before finalizing the design, we conducted moderated usability testing on the initial (V1) prototype to observe how real users interacted with the core meal discovery and planning flows.

## Test Objectives
1. Verify if users can easily discover meals based on their available ingredients.
2. Observe how users interact with the progressive filtering system (Time, Mood, Budget).
3. Identify any points of confusion or friction within the navigation and recipe details.

## Methodology
* **Method:** Moderated usability testing with a Think-Aloud protocol.
* **Scenarios:** Users were given 3 core task scenarios (e.g., "Find a comforting meal you can cook in 20 minutes with rice and eggs").
* **Focus:** Task completion, areas of hesitation, and comprehension of UI copy.

## Key Findings & Friction Points
During the testing, we identified several critical usability issues:

1. **Vague Call-to-Actions (Severity: High):** Users hesitated when interacting with buttons that had playful but unclear microcopy (e.g., "Let's do this!"). They were unsure of what action would follow.
2. **Accessibility & Input Fields (Severity: High):** Input fields relied solely on placeholder texts with a low contrast ratio (3.9:1). When users started typing, the label disappeared, causing memory strain.
3. **Hidden Primary Actions (Severity: Medium):** Users took longer than expected to find secondary actions, such as the "Share Recipe" function, which cluttered the primary reading experience.

## Top 3 Action Items for Iteration (V2)
1. **Rewrite CTAs:** Replace all playful button texts with clear, descriptive, and action-oriented labels (e.g., "Save Goal", "Share Recipe").
2. **Fix Form Accessibility:** Increase placeholder contrast to WCAG AA standards (7.5:1) and implement persistent floating labels for all input fields.
3. **Refine Recipe Navigation:** Move secondary recipe actions into a structured overflow menu to keep the main recipe instructions clean and focused.
