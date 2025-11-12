# Investor Documents Placeholder

## Files to be added:

1. **TRYONYOU_Investor_Deck.pptx**
   - Comprehensive investor presentation
   - Market analysis, technology overview, financial projections
   - Team and roadmap

2. **TRYONYOU_Investor_Dossier.pdf**
   - Detailed technical and business documentation
   - Patent portfolio details
   - Competitive analysis
   - Go-to-market strategy

## How to add these files:

Simply drop the files into the `TRYONYOU_DEPLOY_EXPRESS_INBOX` folder and they will be automatically published to `/docs/` and linked in the investor portal.

```bash
cp TRYONYOU_Investor_Deck.pptx ~/tryonyou/TRYONYOU_DEPLOY_EXPRESS_INBOX/
cp TRYONYOU_Investor_Dossier.pdf ~/tryonyou/TRYONYOU_DEPLOY_EXPRESS_INBOX/
```

The Deploy Express system will:
- Detect the files
- Publish them to `/docs/`
- Update the investor portal links
- Send Telegram notification
- Make them available at:
  - https://tryonyou.app/docs/TRYONYOU_Investor_Deck.pptx
  - https://tryonyou.app/docs/TRYONYOU_Investor_Dossier.pdf

