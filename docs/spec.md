# Station T Pilot Specification

## Technical Core & Logic

### 1. Input/Output Contract (The "No-Noise" Rule)
The students must treat the logic as a black box.

*   **Input**: Raw pixel data from the sensor + Calibration Constant.
*   **Process**: Apply the `calcular_altura_real` function (correcting the "4-meter" error).
*   **Output**: A clean JSON object formatted for translation.

### 2. Translation Dictionary (i18n)
To meet the requirement for English, French, and Spanish, the code must not contain hardcoded strings.

*   **Requirement**: All UI labels and results must be pulled from a `messages.json` file.
*   **Goal**: The pilot should detect the user's language or allow a toggle without changing the logic.

### 3. Error Handling (The "Lafayette" Standard)
Since this is for a high-end environment like Galeries Lafayette, the system cannot show "Error 500".

*   **Requirement**: If the sensor gives a measurement outside of logical human bounds (< 1.00m or > 2.20m), the system must display a polite "Recalibrating..." message in the selected language instead of a wrong number.
