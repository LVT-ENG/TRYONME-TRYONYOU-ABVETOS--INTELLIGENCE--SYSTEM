import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PEACOCK = "#0F5E68";

export default function BiometricPayment() {
  const [step, setStep] = useState('setup'); // setup, iris, voice, confirm, success
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    currency: 'EUR',
    item: ''
  });

  // Promise-based delay function for better testability
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleBiometricStep = async (nextStep) => {
    // Mock biometric validation
    await delay(2000);
    setStep(nextStep);
  };

  const BiometricSetup = () => (
    <div className="text-center">
      <div className="text-6xl mb-6">🔒</div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: PEACOCK }}>
        ABVET Dual-Biometric Payment Setup
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Secure payment using iris recognition and voice authentication. 
        This demo uses mock biometric data for demonstration purposes.
      </p>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <div className="flex items-center">
          <div className="text-yellow-600 mr-3">⚠️</div>
          <div className="text-sm text-yellow-800">
            <strong>Demo Mode:</strong> This is a prototype using mock biometric validation.
            No real biometric data is captured or stored.
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Item name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={paymentData.item}
          onChange={(e) => setPaymentData({...paymentData, item: e.target.value})}
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={paymentData.amount}
          onChange={(e) => setPaymentData({...paymentData, amount: parseFloat(e.target.value)})}
        />
      </div>

      <button
        onClick={() => setStep('iris')}
        className="px-8 py-3 text-white font-semibold rounded-lg transition-colors"
        style={{ backgroundColor: PEACOCK }}
        disabled={!paymentData.item || !paymentData.amount}
      >
        Start Biometric Payment
      </button>
    </div>
  );

  const IrisScanning = () => (
    <div className="text-center">
      <div className="text-6xl mb-6">👁️</div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: PEACOCK }}>
        Iris Recognition
      </h2>
      <p className="text-gray-600 mb-8">
        Please look directly at the camera for iris scanning
      </p>
      
      <div className="relative mx-auto w-64 h-64 mb-8">
        <div className="absolute inset-0 border-4 border-dashed border-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 border-2 border-blue-500 rounded-full"></div>
        <div className="absolute inset-8 bg-blue-100 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-4xl"
          >
            👁️
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2 }}
        className="bg-blue-500 h-2 rounded-full mx-auto max-w-md"
        onAnimationComplete={() => handleBiometricStep('voice')}
      />
      <p className="text-sm text-gray-500 mt-2">Scanning iris pattern...</p>
    </div>
  );

  const VoiceRecognition = () => (
    <div className="text-center">
      <div className="text-6xl mb-6">🎤</div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: PEACOCK }}>
        Voice Authentication
      </h2>
      <p className="text-gray-600 mb-8">
        Please say: "I authorize this payment"
      </p>
      
      <div className="bg-gray-100 rounded-lg p-8 mb-8">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-4xl mb-4"
        >
          🔊
        </motion.div>
        <p className="text-lg font-mono">"I authorize this payment"</p>
      </div>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 3 }}
        className="bg-green-500 h-2 rounded-full mx-auto max-w-md"
        onAnimationComplete={() => handleBiometricStep('confirm')}
      />
      <p className="text-sm text-gray-500 mt-2">Analyzing voice pattern...</p>
    </div>
  );

  const PaymentConfirmation = () => (
    <div className="text-center">
      <div className="text-6xl mb-6">✅</div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: PEACOCK }}>
        Biometric Authentication Complete
      </h2>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span>Item:</span>
            <span className="font-semibold">{paymentData.item}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="font-semibold">{paymentData.amount} {paymentData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span>Authentication:</span>
            <span className="text-green-600 font-semibold">✓ Iris + Voice</span>
          </div>
        </div>
      </div>

      <div className="space-x-4">
        <button
          onClick={() => handleBiometricStep('success')}
          className="px-8 py-3 text-white font-semibold rounded-lg transition-colors"
          style={{ backgroundColor: PEACOCK }}
        >
          Confirm Payment
        </button>
        <button
          onClick={() => setStep('setup')}
          className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const PaymentSuccess = () => (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="text-6xl mb-6"
      >
        🎉
      </motion.div>
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        Payment Successful!
      </h2>
      <p className="text-gray-600 mb-8">
        Your biometric payment has been processed securely
      </p>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-2 text-green-800">Transaction Complete</h3>
        <p className="text-sm text-green-600">
          Payment ID: TXN-{Date.now()}
        </p>
      </div>

      <button
        onClick={() => setStep('setup')}
        className="px-8 py-3 text-white font-semibold rounded-lg transition-colors"
        style={{ backgroundColor: PEACOCK }}
      >
        New Payment
      </button>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 'setup': return <BiometricSetup />;
      case 'iris': return <IrisScanning />;
      case 'voice': return <VoiceRecognition />;
      case 'confirm': return <PaymentConfirmation />;
      case 'success': return <PaymentSuccess />;
      default: return <BiometricSetup />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: PEACOCK }}>
            ABVET Dual-Biometric Payment
          </h1>
          <p className="text-xl text-gray-600">
            Revolutionary payment system using iris recognition and voice authentication
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: "🔐", title: "Maximum Security", desc: "Dual biometric authentication prevents fraud" },
            { icon: "⚡", title: "Lightning Fast", desc: "Complete payments in under 10 seconds" },
            { icon: "🌍", title: "Universal Access", desc: "No cards, phones, or wallets needed" }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}