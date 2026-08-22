# Retrospective: From Assumption to Execution

**Written for the designer I was in Week 1.**

## 1. Where I Started

When I started this project in Week 1, my goal was to solve a frustrating everyday problem: the decision fatigue of figuring out what to eat. My original vision for *Whatcha Got?* was essentially a massive, all-encompassing recipe directory. I assumed that the core problem users faced was a lack of options, and therefore, the solution was to provide them with as many recipes as possible based on the ingredients in their kitchen. I thought the success of the app would rely on having the most features and the biggest database. I was focused on building a visually impressive app, but I hadn't yet grasped the psychological weight of everyday decision-making.

## 2. What Changed

As I moved from initial ideation to wireframing and user testing, my biggest assumption completely shattered. I realized that giving users an endless list of recipes didn't solve their decision fatigue—it actively made it worse.

The most significant pivot in my design process was shifting the product's identity from a "search engine" to a "decision-making tool." I learned that users—especially students, busy professionals, and those living alone—didn't want more choices; they wanted the *right* choice.

This completely changed my UX approach. Instead of an open-ended search bar, I constrained the core flow around four specific inputs: available ingredients, cooking time, mood, and budget. I also realized that my initial UI decisions prioritized cleverness over clarity. For example, my early buttons had playful, vague microcopy like "Let's do this!", which testing revealed only caused hesitation. I had to strip away the fluff and replace it with direct, action-oriented labels like "Save Goal."

## 3. What I Actually Built

Over the course of this 8-week sprint, I didn't build a fully coded application, but rather a rigorously tested, high-fidelity mobile prototype in Figma.

The current *Whatcha Got?* experience is a complete, validated user journey. It includes a seamless onboarding and authentication flow (including OTP recovery), a primary home interface centered on ingredient-based discovery, and a progressive filtering system. I built out the detailed recipe-viewing experience, a favorites and sharing system, and a practical weekly meal planner. Behind the screens, I constructed a comprehensive, reusable design system with standardized design tokens, component variants, and documented edge cases (empty states, errors, loading screens, and offline modes) to ensure the interface remains robust in any scenario.

## 4. What I Would Build Next

If I were handing this prototype over to a development team tomorrow, the immediate next step would be moving from simulated logic to actual backend infrastructure.

I would prioritize building a dynamic recommendation engine to rank meal suggestions based on real user inputs. To make the budget feature truly useful, I would want to integrate real-time pricing APIs synced with local grocery data. Further down the product roadmap, I would look into implementing image recognition so users could simply scan their pantry rather than typing ingredients, and I would ensure deep, persistent offline functionality through local data caching.

## 5. Three Most Transferable Lessons

**Lesson 1 — Start from the user's decision, not the feature list.**
A visually stunning interface is useless if it overwhelms the user. I learned that strategically limiting choices—by forcing the user to filter by time, mood, and budget up front—creates a far better experience than providing an infinite scroll of options. Good design is often about removing friction, not adding features.

**Lesson 2 — Prototype and testing expose the creator's blind spots.**
I initially designed input fields with disappearing placeholder text because I thought it looked clean and minimal. It wasn't until I evaluated the design that I realized it failed accessibility contrast standards (WCAG AA) and caused unnecessary memory strain for the user. Furthermore, designing the "happy path" is only half the job. Realizing that error states, zero-result screens, and offline notifications are a critical part of the core UX was a major shift in how I view product architecture.

**Lesson 3 — AI is a thinking partner, not a replacement for judgment.**
Early on, I wrote a failed prompt asking AI to "design the best meal-planning experience." It yielded generic, unusable results because it lacked constraints. Once I shifted my approach and started using AI to brainstorm edge cases, review user flows for potential friction, and structure my documentation, it became an invaluable tool. I learned that AI requires specific product context and a defined target audience to be useful, accelerating my own design process rather than replacing my decision-making.