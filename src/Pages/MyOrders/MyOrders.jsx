import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { RingLoader } from 'react-spinners';

import { FaRegFilePdf } from 'react-icons/fa6';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const MyOrders = () => {
  const { user } = use(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    doc.text('My Orders Reports', 14, 15);

    const tableColumn = [
      'SL No',
      'Product Name',
      'Buyer Name',
      'Price',
      'Quantity',
      'Address',
      'Date',
      'Phone',
    ];

    const tableRows = orders.map((order, index) => [
      index + 1,
      order.productName,
      user.displayName,
      order.price,
      order.quantity,
      order.address,
      order.date,
      order.phone,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [9, 32, 82] },
    });

    doc.save(`MyOrders_${user.displayName}.pdf`);
    // console.log('PDF for', orders.length, 'orders');
  };

  return (
    <div className="px-3 sm:px-6 md:px-10 lg:w-10/12 mx-auto py-10">
      <title>Fureverly | My Listings</title>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-4xl font-semibold YesevaOne text-[#092052]">
          My Orders ({orders.length})
        </h2>

        {orders.length > 0 && (
          <button
            onClick={handleDownloadReport}
            className="bg-[#092052] text-white px-4 py-2 rounded-lg hover:bg-[#0c2a6a] transition-all flex items-center gap-2"
          >
            <FaRegFilePdf /> Download Report
          </button>
        )}
      </div>

      {loading ? (
        <div className="min-h-[50vh] flex justify-center items-center transition-opacity duration-300">
          <RingLoader size={80} color="#092052" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md">
          <table className="table w-full text-sm md:text-base">
            <thead className="bg-[#092052] text-white">
              <tr>
                <th className="py-3 px-2 text-center">SL No</th>
                <th className="py-3 px-2 text-center">Product Name</th>
                <th className="py-3 px-2 text-center">Buyer Name</th>
                <th className="py-3 px-2 text-center hidden sm:table-cell">
                  Price
                </th>
                <th className="py-3 px-2 text-center hidden md:table-cell">
                  Quantity
                </th>
                <th className="py-3 px-2 text-center hidden lg:table-cell">
                  Address
                </th>
                <th className="py-3 px-2 text-center hidden lg:table-cell">
                  Date
                </th>
                <th className="py-3 px-2 text-center">Phone</th>
              </tr>
            </thead>

            <tbody className="">
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 border-t border-gray-100 transition"
                >
                  <td className="py-3 px-2 text-center tinos">{index + 1}</td>
                  <td className="py-3 px-2 text-center tinos">
                    {order.productName}
                  </td>
                  <td className="py-3 px-2 font-semibold text-center tinos">
                    {user.displayName}
                  </td>
                  <td className="py-3 px-2 hidden sm:table-cell text-center tinos">
                    {order.price}
                  </td>
                  <td className="py-3 px-2 hidden sm:table-cell text-center tinos">
                    {order.quantity}
                  </td>
                  <td className="py-3 px-2 hidden md:table-cell text-center tinos">
                    {order.address}
                  </td>
                  <td className="py-3 px-2 hidden lg:table-cell text-center tinos">
                    {order.date}
                  </td>
                  <td className="py-3 px-2 hidden lg:table-cell text-center tinos">
                    {order.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
