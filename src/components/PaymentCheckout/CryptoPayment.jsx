import { useState, useEffect } from "react";
import { Bitcoin, Copy, CheckCircle } from "lucide-react";

const CryptoPayment = ({ orderSummary, userDetails, onSuccess, onError }) => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mock crypto rates 
  const cryptoRates = {
    BTC: 45000, // 1 BTC = $45,000
    ETH: 3000,  // 1 ETH = $3,000
    USDT: 1,    // 1 USDT = $1
    USDC: 1,    // 1 USDC = $1
  };

  useEffect(() => {
    // Simulate generating wallet address
    const generateWalletAddress = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock wallet address based on selected crypto
      const addresses = {
        BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        ETH: "0x742E4d6F6B6D6B6D6B6D6B6D6B6D6B6D6B6D6B6D",
        USDT: "0x842E4d6F6B6D6B6D6B6D6B6D6B6D6B6D6B6D6B6D",
        USDC: "0x942E4d6F6B6D6B6D6B6D6B6D6B6D6B6D6B6D6B6D",
      };
      
      setWalletAddress(addresses[selectedCrypto]);
      setCryptoAmount(orderSummary.total / cryptoRates[selectedCrypto]);
      setIsLoading(false);
    };

    generateWalletAddress();
  }, [selectedCrypto, orderSummary.total]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cryptocurrencies = [
    { symbol: "BTC", name: "Bitcoin", network: "Bitcoin Network" },
    { symbol: "ETH", name: "Ethereum", network: "ERC20" },
    { symbol: "USDT", name: "Tether", network: "ERC20" },
    { symbol: "USDC", name: "USD Coin", network: "ERC20" },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006F6A]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center">
          <Bitcoin className="h-5 w-5 text-orange-600 mr-2" />
          <span className="font-medium text-orange-800">Crypto Payment</span>
        </div>
        <p className="text-sm text-orange-700 mt-1">
          Send exact amount to the wallet address below.
        </p>
      </div>

      {/* Cryptocurrency Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Cryptocurrency
        </label>
        <select
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006F6A]"
        >
          {cryptocurrencies.map((crypto) => (
            <option key={crypto.symbol} value={crypto.symbol}>
              {crypto.name} ({crypto.symbol}) - {crypto.network}
            </option>
          ))}
        </select>
      </div>

      {/* Amount to Send */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {cryptoAmount.toFixed(8)} {selectedCrypto}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            ≈ ${orderSummary.total} USD
          </div>
        </div>
      </div>

      {/* Wallet Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Send to this wallet address:
        </label>
        <div className="flex items-center space-x-2">
          <code className="flex-1 bg-gray-100 p-3 rounded-md text-sm break-all">
            {walletAddress}
          </code>
          <button
            onClick={handleCopyAddress}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            {copied ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* QR Code Placeholder */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg text-center">
        <div className="bg-gray-200 w-32 h-32 mx-auto mb-2 flex items-center justify-center">
          <span className="text-gray-500 text-sm">QR Code</span>
        </div>
        <p className="text-xs text-gray-600">Scan QR code for easy payment</p>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-semibold text-sm mb-2">Important Instructions:</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Send exactly {cryptoAmount.toFixed(8)} {selectedCrypto}</li>
          <li>• Network fees are your responsibility</li>
          <li>• Payment confirmation may take 10-30 minutes</li>
          <li>• Do not send from an exchange wallet</li>
        </ul>
      </div>

      <div className="text-xs text-gray-500 text-center">
        After sending crypto, your tickets will be automatically issued once the transaction is confirmed on the blockchain.
      </div>
    </div>
  );
};

export default CryptoPayment;