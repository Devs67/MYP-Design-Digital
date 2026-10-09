# Berry homepage animation instructions

These instructions apply only to the berry homepage export. Keep the page layout, text and card positions fixed while motion happens in the background or during interaction.

## 1. Fluid background

The reference is the Flow effect from https://feralui.dev/gradients: colour fields continuously stretch, bend and blend. Do not animate a few circles by simply moving them from left to right.

Use three or four oversized white and soft-blue fields behind the page:

- Base: #F5F8FF
- Field 1: #DCEBFF
- Field 2: #A9D0FF
- Optional white field: #FFFFFF
- Opacity: about 12–32% per field
- Blur: about 48–96 px
- Keep the grid stationary at 5–7% blue opacity
- Keep all cards, text and controls above the fields

For a CSS/SVG implementation, combine oversized pseudo-elements or SVG paths and animate several properties at once:

- transform: translate3d(...) scale(...) rotate(...)
- changing border-radius
- slow opacity changes
- a small blur change

Use different durations between 14 and 24 seconds so the fields never repeat together. Alternate the direction at the end of each loop. Use ease-in-out or a smooth sine-like easing. The motion should be visible after a few seconds but remain calm enough for reading.

For a more exact Flow-style deformation, use an SVG displacement filter or a small WebGL shader. This is optional; no library is needed for the basic CSS/SVG version.

Do not use berry in the moving background. Berry is reserved for interactive labels.

## 2. Page-load motion

Keep the initial entrance restrained:

- Header: fade in and move upward 8 px over 350 ms
- Hero copy: fade in and move upward 12 px over 450 ms
- Design-cycle panel: fade in over 500 ms
- Year cards: fade in and move upward 12 px over 450–600 ms
- Shared resources: fade in and move upward 12 px over 550–700 ms

Use a short stagger of 50–70 ms between groups. Do not stagger every word or every card for a long sequence.

## 3. Hover and focus

Only interactive elements receive interactive motion.

Berry action links:

- Default: #A13C66, Work Sans Bold
- Hover: #7D2D4E
- Transition: 180–220 ms
- Add a subtle underline or 1–2 px upward shift

Cards:

- Hover: move upward 2 px
- Increase shadow slightly
- Transition: 220–280 ms
- Keep the heading charcoal; do not recolour the whole card

Keyboard focus:

- Use a visible berry outline
- Animate the outline in about 160 ms
- Never rely on colour alone

The A–D cycle overview is informational, so it should not lift, glow or behave like a button unless it receives a real destination.

## 4. Action transitions

For Enter MYP 1 & 2, Enter MYP 3, Enter MYP 4 & 5, and the three shared-resource links:

- Keep the text label visible during the transition
- Use a 250–350 ms ease-out transition
- Let the action indicator glide 4–8 px toward the direction of travel
- Keep the page background stable while the destination loads

In Figma, connect the visible action label to the destination frame and use Smart Animate. Keep matching layer names and structure between frames. Use roughly 350 ms with Ease Out. Do not attach the prototype reaction to the whole card.

## 5. Design-cycle A → B transition

When moving from Criterion A to Criterion B:

1. Keep the shared header and background in place.
2. Fade the outgoing content to about 0.15 opacity.
3. Glide the incoming content from the direction of travel by 24–32 px.
4. Bring the incoming content to full opacity.
5. Finish in 450–550 ms with Ease Out.

The button or selected criterion indicator should glide with the content, rather than teleporting. Keep the title and main card stable enough that the user understands the page has changed.

## 6. Theme transition

For Light/Dark:

- Crossfade page background, surfaces, borders and text over 300–400 ms
- Keep layout dimensions unchanged
- Avoid a white flash between themes
- Keep the berry action role clear in both themes
- Test the focus outline and disabled states in both themes

## 7. Reduced motion

Support:

@media (prefers-reduced-motion: reduce)

When enabled:

- Stop the fluid background loop or use a static backdrop
- Remove entrance movement
- Keep opacity changes under 150 ms
- Remove card lift and indicator glides
- Keep focus and selected-state changes visible

## 8. Quality checks

- Motion is visible at normal speed without distracting from reading.
- The background fields deform and blend; they do not look like three bouncing blobs.
- The grid, cards and text remain stationary.
- No animation causes horizontal scrolling or layout shift.
- All berry links still work with keyboard and touch.
- The page remains readable over the moving background.
- Test desktop, mobile and reduced-motion settings.
