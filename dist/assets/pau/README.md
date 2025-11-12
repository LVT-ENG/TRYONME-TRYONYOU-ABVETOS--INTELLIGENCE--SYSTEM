# Pau Animation Assets

This directory contains the animation files for **Pau**, the TRYONYOU peacock mascot and virtual fashion assistant.

## 📁 Required Files

### Current Assets

- `pau_idle.webm` - Default idle animation (looping)
- `pau_hover.webm` - Hover state animation
- `pau_celebration.webm` - Celebration/success animation
- `pau_thinking.webm` - Thinking/processing animation
- `pau_waving.webm` - Greeting/waving animation

## 🎨 Asset Specifications

### Video Format
- **Format**: WebM (VP9 codec recommended)
- **Resolution**: 512x512px (1:1 aspect ratio)
- **Frame Rate**: 30 FPS
- **Duration**: 
  - Idle: 3-5 seconds (looping)
  - Hover: 2-3 seconds
  - Celebration: 3-4 seconds
  - Thinking: 2-3 seconds (looping)
  - Waving: 2-3 seconds

### Visual Requirements
- **Background**: Transparent (alpha channel)
- **Character**: Peacock mascot with Peacock Blue (#006D77) and Luxury Gold (#C5A46D) accents
- **Halo Effect**: Animated glow/halo in peacock blue around the character
- **Style**: Modern, elegant, fashion-forward aesthetic
- **File Size**: < 500 KB per file (optimized for web)

## 🎭 Animation States

### 1. Idle (pau_idle.webm)
- **Trigger**: Default state
- **Description**: Gentle breathing animation, subtle peacock feather movement
- **Loop**: Yes

### 2. Hover (pau_hover.webm)
- **Trigger**: Mouse hover over Pau
- **Description**: Character looks up, feathers spread slightly, welcoming gesture
- **Loop**: No (returns to idle)

### 3. Celebration (pau_celebration.webm)
- **Trigger**: User clicks on Pau, successful action completed
- **Description**: Full peacock display, feathers fully spread, sparkle effects
- **Loop**: No (plays once, returns to idle)

### 4. Thinking (pau_thinking.webm)
- **Trigger**: AI processing, loading states
- **Description**: Character in contemplative pose, subtle head tilt, rotating halo
- **Loop**: Yes (while processing)

### 5. Waving (pau_waving.webm)
- **Trigger**: User first visit, greeting scenarios
- **Description**: Friendly wave gesture, welcoming expression
- **Loop**: No (plays once)

## 🛠️ Creating Assets

### Recommended Tools
- **Blender** - 3D modeling and animation
- **After Effects** - 2D animation and effects
- **FFmpeg** - Video conversion and optimization

### Conversion Command (FFmpeg)
```bash
ffmpeg -i input.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 30 -an pau_idle.webm
```

### Optimization Tips
- Use VP9 codec for better compression
- Enable alpha channel for transparency
- Optimize for web delivery (target < 500 KB)
- Test on mobile devices for performance

## 📱 Responsive Behavior

- **Desktop**: 120x120px display size
- **Tablet**: 90x90px display size
- **Mobile**: 70x70px display size

## 🎨 Color Palette Reference

- **Peacock Blue**: #006D77
- **Luxury Gold**: #C5A46D
- **Bone**: #F5EFE6
- **Anthracite**: #141619

## 🔗 Integration

The assets are integrated via the `PauOverlay` component:

```jsx
import PauOverlay from './components/PauOverlay';

<PauOverlay 
  visible={true}
  animationState="idle"
  onInteraction={(state) => console.log('Pau state:', state)}
/>
```

## 📝 Notes

- All animations should maintain consistent character design
- Ensure smooth transitions between states
- Test performance on low-end devices
- Consider adding sound effects (optional, muted by default)
- Future: Add voice interaction capabilities

## 🚀 Future Enhancements

- [ ] Voice-activated animations
- [ ] Context-aware expressions
- [ ] Seasonal/event-specific animations
- [ ] User preference customization
- [ ] Accessibility alternatives (static image fallback)

---

**Last Updated**: October 8, 2025  
**Version**: 1.0.0  
**Contact**: TRYONYOU Design Team
