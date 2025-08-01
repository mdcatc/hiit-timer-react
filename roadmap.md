# 🏁 Interval Timer – Project Roadmap

## 📦 Phase 1: Core Functionality

### 📝 Requirements & Planning

* [x] Define functional requirements
* [x] Define visual behavior and UI specs
* [x] Define shorthand workout notation format
* [x] Create requirements document
* [x] Create project roadmap

### 🎨 UI/UX Design

* [ ] Design minimal entry form (work/rest/sets/cycles input)
* [x] Design timer display (large number, labels, background)
* [ ] Design layout for mobile & desktop

### 💻 Core Logic Implementation

* [x] Build HTML structure
* [x] Implement CSS for layout and responsive design
* [x] Implement JavaScript countdown/count-up timer
* [x] Implement work/rest phase transitions
* [x] Implement cycle/segment repetition logic
* [x] Parse structured inputs into timed intervals
* [x] Parse shorthand syntax like `((w20,w20,w20,r60)3x)3x`
* [x] Add label display for phase (Work, Rest, etc.)
* [x] Add markdown parsing for routines

## 🎨 Phase 2: Visual & Audio Feedback

### 🟢 Visual Feedback

* [x] Green background for work phases
* [x] Yellow background when < 5s
* [ ] Flashing red background when < 3s
* [x] Solid blue background during rest
* [x] Final “Workout Complete” message and background

### 🔊 Audio Feedback (Optional)

* [ ] Beep at 10s remaining (toggleable)
* [ ] Beep at 5s remaining (toggleable)
* [ ] Beep/chime at phase transitions

## ⚙️ Phase 3: Settings & Usability

* [ ] Toggle between count-up and count-down
* [ ] Display current set and cycle progress
* [ ] Add reset/start/stop controls
* [ ] Add input validation with error messages
* [ ] Add dark mode toggle

## 🧪 Phase 4: Testing & Refinement

* [ ] Test timing accuracy (real-time sync)
* [ ] Test visual transitions on different devices
* [ ] Test input parsing edge cases
* [ ] Fix bugs & polish UI
* [ ] Optimize for performance

## 💾 Phase 5: Optional Enhancements

* [ ] Save/load routines using localStorage
* [ ] Export/import workout definitions (e.g., JSON)
* [ ] Voice announcements for phase changes
* [ ] Add favicon and page metadata
* [ ] Convert to PWA for mobile installability

---

Let me know if you want me to generate the basic HTML/JS scaffolding or dive into any specific phase next.
