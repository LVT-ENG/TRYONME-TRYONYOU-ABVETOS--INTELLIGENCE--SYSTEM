/**
 * PDF Receipt Generator for Armario Solidario donations
 */

const jsPDF = require('jspdf');
const path = require('path');
const fs = require('fs').promises;

async function generateReceiptPDF(donation) {
  try {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(102, 126, 234); // Purple color
    pdf.text('ARMARIO SOLIDARIO', pageWidth / 2, 30, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Donation Receipt', pageWidth / 2, 45, { align: 'center' });
    
    // Line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, 55, pageWidth - 20, 55);
    
    // Receipt details
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    
    let yPos = 75;
    const lineHeight = 8;
    
    // Donation information
    pdf.setFont(undefined, 'bold');
    pdf.text('DONATION DETAILS', 20, yPos);
    yPos += lineHeight + 5;
    
    pdf.setFont(undefined, 'normal');
    pdf.text(`Receipt ID: ${donation.id || 'N/A'}`, 20, yPos);
    yPos += lineHeight;
    
    pdf.text(`Date: ${new Date(donation.createdAt || Date.now()).toLocaleDateString()}`, 20, yPos);
    yPos += lineHeight;
    
    pdf.text(`Amount: ${donation.amount} ${(donation.currency || 'EUR').toUpperCase()}`, 20, yPos);
    yPos += lineHeight;
    
    pdf.text(`Payment Method: ${donation.paymentMethod?.toUpperCase() || 'N/A'}`, 20, yPos);
    yPos += lineHeight + 10;
    
    // Donor information
    if (donation.donorInfo) {
      pdf.setFont(undefined, 'bold');
      pdf.text('DONOR INFORMATION', 20, yPos);
      yPos += lineHeight + 5;
      
      pdf.setFont(undefined, 'normal');
      if (donation.donorInfo.name) {
        pdf.text(`Name: ${donation.donorInfo.name}`, 20, yPos);
        yPos += lineHeight;
      }
      
      if (donation.donorInfo.email) {
        pdf.text(`Email: ${donation.donorInfo.email}`, 20, yPos);
        yPos += lineHeight;
      }
      
      if (donation.donorInfo.phone) {
        pdf.text(`Phone: ${donation.donorInfo.phone}`, 20, yPos);
        yPos += lineHeight;
      }
      
      yPos += 10;
    }
    
    // Clothing items (if any)
    if (donation.clothingItems && donation.clothingItems.length > 0) {
      pdf.setFont(undefined, 'bold');
      pdf.text('DONATED ITEMS', 20, yPos);
      yPos += lineHeight + 5;
      
      pdf.setFont(undefined, 'normal');
      donation.clothingItems.forEach((item, index) => {
        pdf.text(`${index + 1}. ${item.type || 'Item'} - ${item.brand || 'Unknown Brand'} (${item.condition || 'Good'})`, 25, yPos);
        yPos += lineHeight;
      });
      
      yPos += 10;
    }
    
    // Impact message
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(72, 187, 120); // Green color
    pdf.text('THANK YOU FOR YOUR CONTRIBUTION!', pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight + 5;
    
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(0, 0, 0);
    const impactMessage = `Your donation helps provide clothing to those in need through our Solidarity Wardrobe initiative. Together, we're building a more sustainable and caring fashion ecosystem.`;
    
    const splitText = pdf.splitTextToSize(impactMessage, pageWidth - 40);
    pdf.text(splitText, pageWidth / 2, yPos, { align: 'center' });
    yPos += splitText.length * lineHeight + 15;
    
    // Tax information
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('This receipt serves as proof of your charitable donation.', pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight;
    pdf.text('Please consult with your tax advisor regarding deductibility.', pageWidth / 2, yPos, { align: 'center' });
    
    // Footer
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, pageHeight - 40, pageWidth - 20, pageHeight - 40);
    
    pdf.setFontSize(8);
    pdf.text('Armario Solidario - AVBETOS Intelligence System', pageWidth / 2, pageHeight - 30, { align: 'center' });
    pdf.text('www.tryonyou.app/armario-solidario', pageWidth / 2, pageHeight - 22, { align: 'center' });
    pdf.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 14, { align: 'center' });
    
    // Save PDF
    const receiptDir = path.join(__dirname, '..', 'receipts');
    await fs.mkdir(receiptDir, { recursive: true });
    
    const filename = `receipt_${donation.id}_${Date.now()}.pdf`;
    const filepath = path.join(receiptDir, filename);
    
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));
    await fs.writeFile(filepath, pdfBuffer);
    
    console.log(`✅ Receipt PDF generated: ${filename}`);
    return filepath;
    
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate receipt PDF');
  }
}

module.exports = {
  generateReceiptPDF
};