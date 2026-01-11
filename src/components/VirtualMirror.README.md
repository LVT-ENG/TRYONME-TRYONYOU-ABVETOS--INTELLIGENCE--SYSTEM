# VirtualMirror Component

## Overview

The VirtualMirror component is the core biometric scanning interface for TRYONYOU's "Espejo Mágico" (Magic Mirror) experience. It provides real-time camera access for 3D body scanning while maintaining strict privacy standards.

## Features

- ✅ **Real-time Camera Activation**: Accesses user's camera with permission
- ✅ **Divineo V7 Styling**: Premium golden borders and glassmorphism effects
- ✅ **Privacy-First**: No image storage, all processing on-device
- ✅ **Pau Agent Integration**: AI assistant overlay in bottom-left corner
- ✅ **Mobile & Desktop Responsive**: Works across devices
- ✅ **Accessibility**: Proper cleanup of camera resources

## Usage

### Route
```
/mirror
```

### Import
```javascript
import VirtualMirror from '@/components/VirtualMirror';
```

### Component Structure
```jsx
<VirtualMirror />
```

## Technical Details

### Dependencies
- React 18.3.1
- Browser MediaDevices API
- Tailwind CSS

### Browser Requirements
- Modern browser with WebRTC support
- Camera permission required
- HTTPS connection (or localhost for development)

### Camera Stream Management
The component properly manages camera lifecycle:
1. **Mount**: Requests camera access and starts stream
2. **Active**: Displays video feed with UI overlay
3. **Unmount**: Stops all camera tracks to free resources

### Privacy Implementation
```javascript
// No image capture or storage
// Stream only used for display
// All tracks stopped on cleanup
```

## Styling (Divineo V7)

### Color Palette
- Background: `#141619` (Anthracite)
- Border: `#C5A46D` (Luxury Gold)
- Text: `#F5EFE6` (Light Beige)
- Shadow: `rgba(197,164,109,0.35)` (Golden glow)

### CSS Classes
```css
.h-screen                                    /* Full height */
.bg-[#141619]                               /* Anthracite background */
.border-2.border-[#C5A46D]                  /* Golden border */
.rounded-xl                                  /* Rounded corners */
.shadow-[0_0_24px_rgba(197,164,109,0.35)]  /* Golden glow */
.backdrop-blur-md                            /* Glassmorphism */
```

## File Structure

```
src/
└── components/
    └── VirtualMirror.jsx
```

## Integration with Lafayette Pilot

The VirtualMirror is the entry point for the Lafayette Pilot experience:

1. User visits `/mirror` route
2. Camera activates (with permission)
3. Pau agent appears in corner
4. "Escaneando Biometría..." message displays
5. Ready for body measurements (future integration)

## Related Components

- **MagicMirror.jsx**: Legacy placeholder component
- **BiometricCapture.tsx**: TypeScript variant with MediaPipe
- **BodyScan.jsx**: Full body measurement component

## Performance

- Component size: ~1.22 kB (gzipped: 0.77 kB)
- Lazy loaded via React.lazy()
- No external heavy dependencies
- Efficient camera resource management

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 88+     | ✅ Full |
| Firefox | 85+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 88+     | ✅ Full |

## Error Handling

```javascript
try {
  stream = await navigator.mediaDevices.getUserMedia({ video: true });
} catch (error) {
  console.error('Error accessing camera:', error);
  // User will see error in browser (permission denied, no camera, etc.)
}
```

## Future Enhancements

- [ ] Add MediaPipe integration for pose detection
- [ ] Implement body measurement calculations
- [ ] Add recording capability for measurements
- [ ] Multi-language support for UI text
- [ ] Add loading state while camera initializes
- [ ] Implement error boundary for better error handling

## Development

### Run locally
```bash
npm run dev
# Navigate to http://localhost:5173/mirror
```

### Build
```bash
npm run build
# Check dist/ for output
```

### Lint
```bash
npm run lint
# VirtualMirror should have no warnings
```

## License

Part of TRYONYOU system, protected by Patent PCT/EP2025/067317.

## Contact

For technical questions about this component:
- Repository: github.com/LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM
- Website: https://tryonyou.app
