export const dashboardData = {
  sales: {
    total: "34,343.00",
    byWebsite: {
      value: "4.5k",
      percentage: 40
    },
    byMobile: {
      value: "2.8k",
      percentage: 25
    },
    byMarket: {
      value: "2.2k",
      percentage: 20
    },
    byAgent: {
      value: "1.7k",
      percentage: 15
    }
  },
  overview: {
    profit: 23450,
    expense: 23450,
    total: 500.00
  },
  revenueUpdates: [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 50 },
    { month: "Mar", value: 25 },
    { month: "Apr", value: 70 },
    { month: "May", value: 35 },
    { month: "Jun", value: 50 },
    { month: "Jul", value: 20 },
  ],
  yearlySales: {
    current: {
      year: "2023",
      value: 5476
    },
    previous: {
      year: "2022",
      value: 4476
    },
    data: [
      { month: "Jan", value: 1000 },
      { month: "Feb", value: 1200 },
      { month: "Mar", value: 900 },
      { month: "Apr", value: 1500 },
      { month: "May", value: 1300 },
      { month: "Jun", value: 1800 },
      { month: "Jul", value: 1600 },
      { month: "Aug", value: 1400 },
      { month: "Sep", value: 1700 },
      { month: "Oct", value: 1900 },
      { month: "Nov", value: 1500 },
      { month: "Dec", value: 1200 }
    ]
  },
  activeUsers: {
    percentage: "8.06%",
    total: "23,214",
    locations: [
      { id: 1, lat: 40.7128, lng: -74.0060 },
      { id: 2, lat: 34.0522, lng: -118.2437 },
      { id: 3, lat: 51.5074, lng: -0.1278 },
      { id: 4, lat: 35.6762, lng: 139.6503 },
      { id: 5, lat: -33.8688, lng: 151.2093 },
      { id: 6, lat: -15.8267, lng: -47.9218 },
    ]
  },
  paymentGateways: [
    {
      name: "Paypal",
      description: "Big Brands",
      value: "+$6235",
      icon: "paypal"
    },
    {
      name: "Wallet",
      description: "Bill payment",
      value: "-$235",
      icon: "wallet"
    },
    {
      name: "Credit card",
      description: "Bill Payment",
      value: "+$2235",
      icon: "credit-card"
    }
  ]
}; 