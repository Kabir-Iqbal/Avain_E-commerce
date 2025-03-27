"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Download,
  Home,
  PackageCheck,
  ShoppingBag,
  User,
  Calendar,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";

// const html2pdf = require("html2pdf.js");

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderData {
  orderId: string;
  amount: number;
  userName: string;
  status: string;
  orderDate: string;
  items: OrderItem[];
}

const OrderSummary = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData[] | null>(null);
  const [download, setDownload] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [html2pdf, setHtml2pdf] = useState<any>(null);

  useEffect(() => {
    import("html2pdf.js").then((module) => {
      setHtml2pdf(() => module.default);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "order"] {
            orderId, amount, userName, status, orderDate, items
          }`
        );
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrderId(sessionStorage.getItem("paymentIntentId"));
    }
  }, []);

  if (!orderId)
    return (
      <p className="text-center text-red-500 font-semibold">Order ID not found!</p>
    );

  const filteredOrder = orderData?.find((order) => order.orderId === orderId);
  if (!filteredOrder)
    return <p className="text-center text-gray-500 font-semibold">Loading...</p>;

  const DownloadInvoice = () => {
    // if (typeof window === "undefined") return;

    if (!html2pdf) return; // ✅ Ensure html2pdf is loaded
    setDownload(true);
    const element = document.getElementById("invoice");
    const opt = {
      margin: 10,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    if (element) {
      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          setDownload(false);
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div id="invoice" className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border border-gray-200">
      <div className="text-center mb-6">
        {/* <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-2" /> */}
        <div className="w-16 h-16 mx-auto mb-2">
        <svg xmlns="http://www.w3.org/2000/svg"
         width="64" height="64"
         viewBox="0 0 24 24" 
         fill="none" stroke="currentColor" 
         stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" 
        className="text-green-500">
     <path d="M20 6 9 17l-5-5"></path>
     <circle cx="12" cy="12" r="10"></circle>
     </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase. Your order has been placed successfully.</p>
      </div>

      <div className="border-t pt-4 space-y-3 text-gray-700">
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
          <span className="font-medium flex items-center gap-2"><User className="w-5 h-5 text-blue-500" /> Customer:</span>
          <span>{filteredOrder?.userName}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
          <span className="font-medium flex items-center gap-2"><PackageCheck className="w-5 h-5 text-blue-500" /> Order ID:</span>
          <span>{filteredOrder?.orderId}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
          <span className="font-medium flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-500" /> Order Date:</span>
          <span>{filteredOrder?.orderDate}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
          <span className="font-medium flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Status:</span>
          <span>{filteredOrder?.status}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
          <span className="font-medium flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-blue-500" /> Total Amount:</span>
          <span className="font-semibold text-lg">${filteredOrder?.amount}</span>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Ordered Items:</h2>
      <div className="space-y-3">
        {filteredOrder?.items?.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
            <div className="flex items-center gap-4">
              <Image src={item.image} alt={item.name} width={48} height={48} className="w-12 h-12 rounded-md object-cover" />
              <p className="text-gray-700">{item.name}</p>
            </div>
            <p className="text-gray-800 font-semibold">${item.price}</p>
          </div>
        ))}
      </div>

      {!download && (
        <div className="mt-6 flex flex-col gap-3">
          <button onClick={DownloadInvoice} className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Download Invoice
          </button>
          <button onClick={() => router.push("/")} className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300 flex items-center justify-center gap-2">
            <Home className="w-5 h-5" /> Back to Home
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default OrderSummary;
