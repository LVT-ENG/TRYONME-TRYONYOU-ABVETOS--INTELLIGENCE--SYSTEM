/**
 * AutoDonate Module - Automated redistribution (Solidarity Wardrobe)
 */
export class AutoDonate {
    constructor() {
        this.solidarityWardrobe = [];
        this.donations = [];
        this.recipients = [];
        this.redistributionRules = {};
        console.log('🤝 AutoDonate (Solidarity Wardrobe) module initialized');
    }

    addToSolidarityWardrobe(garment, donor) {
        console.log('👕 Adding garment to Solidarity Wardrobe');
        
        const donation = {
            id: `don_${Date.now()}`,
            garment: garment,
            donor: donor,
            condition: this.assessGarmentCondition(garment),
            category: this.categorizeGarment(garment),
            addedAt: new Date().toISOString(),
            status: 'available'
        };

        this.solidarityWardrobe.push(donation);
        this.donations.push(donation);
        
        // Trigger automatic redistribution
        this.triggerRedistribution(donation);
        
        return donation;
    }

    assessGarmentCondition(garment) {
        // Simulate AI-powered condition assessment
        const conditions = ['excellent', 'good', 'fair', 'poor'];
        const weights = [0.3, 0.4, 0.2, 0.1]; // Weighted random selection
        
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < conditions.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return conditions[i];
            }
        }
        
        return 'good';
    }

    categorizeGarment(garment) {
        // Categorize garment for better matching
        const categories = {
            'tops': ['shirt', 'blouse', 't-shirt', 'sweater'],
            'bottoms': ['pants', 'jeans', 'skirt', 'shorts'],
            'outerwear': ['jacket', 'coat', 'blazer', 'cardigan'],
            'dresses': ['dress', 'gown', 'sundress'],
            'accessories': ['scarf', 'hat', 'belt', 'bag']
        };

        for (const [category, items] of Object.entries(categories)) {
            if (items.some(item => garment.type?.toLowerCase().includes(item))) {
                return category;
            }
        }
        
        return 'general';
    }

    triggerRedistribution(donation) {
        console.log('🔄 Triggering automatic redistribution');
        
        // Find potential recipients
        const potentialRecipients = this.findMatchingRecipients(donation);
        
        if (potentialRecipients.length > 0) {
            const selectedRecipient = this.selectBestRecipient(potentialRecipients, donation);
            this.redistributeGarment(donation, selectedRecipient);
        }
    }

    findMatchingRecipients(donation) {
        // Simulate finding matching recipients based on size, style preferences, and need
        return this.recipients.filter(recipient => {
            return this.isGarmentSuitable(donation.garment, recipient);
        });
    }

    isGarmentSuitable(garment, recipient) {
        // Check if garment is suitable for recipient
        const sizeMatch = garment.size === recipient.preferredSize;
        const styleMatch = recipient.stylePreferences.includes(garment.style);
        const categoryMatch = recipient.neededCategories.includes(garment.category);
        
        return sizeMatch && (styleMatch || categoryMatch);
    }

    selectBestRecipient(recipients, donation) {
        // Select the best recipient based on priority and need
        return recipients.sort((a, b) => {
            return (b.priority || 0) - (a.priority || 0);
        })[0];
    }

    redistributeGarment(donation, recipient) {
        console.log('📦 Redistributing garment to recipient');
        
        const redistribution = {
            id: `red_${Date.now()}`,
            donation: donation,
            recipient: recipient,
            status: 'in_transit',
            redistributedAt: new Date().toISOString(),
            estimatedDelivery: this.calculateDeliveryDate()
        };

        // Update donation status
        donation.status = 'redistributed';
        donation.recipient = recipient;
        
        // Notify recipient
        this.notifyRecipient(recipient, redistribution);
        
        return redistribution;
    }

    calculateDeliveryDate() {
        const now = new Date();
        const deliveryDays = Math.floor(Math.random() * 7) + 3; // 3-10 days
        now.setDate(now.getDate() + deliveryDays);
        return now.toISOString();
    }

    notifyRecipient(recipient, redistribution) {
        console.log(`📧 Notifying recipient ${recipient.id} about incoming donation`);
        // Simulate notification system
    }

    registerRecipient(recipientData) {
        const recipient = {
            id: `rec_${Date.now()}`,
            ...recipientData,
            registeredAt: new Date().toISOString(),
            priority: this.calculatePriority(recipientData)
        };

        this.recipients.push(recipient);
        return recipient;
    }

    calculatePriority(recipientData) {
        // Calculate priority based on need, location, and other factors
        let priority = 0;
        
        if (recipientData.urgentNeed) priority += 10;
        if (recipientData.lowIncome) priority += 5;
        if (recipientData.localArea) priority += 3;
        
        return priority;
    }

    getSolidarityStats() {
        return {
            totalDonations: this.donations.length,
            availableItems: this.solidarityWardrobe.filter(item => item.status === 'available').length,
            redistributedItems: this.donations.filter(item => item.status === 'redistributed').length,
            registeredRecipients: this.recipients.length,
            impactScore: this.calculateImpactScore()
        };
    }

    calculateImpactScore() {
        const redistributed = this.donations.filter(item => item.status === 'redistributed').length;
        const total = this.donations.length;
        return total > 0 ? (redistributed / total) * 100 : 0;
    }
}
