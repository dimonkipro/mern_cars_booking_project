import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../redux/Actions/actionsInvoice";
import { Line, Pie, Bar, Doughnut, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const ChartLine = () => {
  const { invoices, loading, errors } = useSelector(
    (state) => state.invoiceReducer
  );

  const user = useSelector((state) => state.userReducer.User);

  const dispatch = useDispatch();

  // State to track the selected year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  // Ensure the data exists and has items
  if (loading) {
    return <p>Loading...</p>;
  }

  if (errors) {
    return <p>Error loading invoices: {errors.message}</p>;
  }

  if (!invoices || invoices.length === 0) {
    return <p>No invoice data available</p>;
  }

  // Grouping invoices by month and calculating total revenue per month for the selected year
  const monthlyRevenue = {};

  invoices.forEach((invoice) => {
    const date = new Date(invoice.bookingStartDate);
    const month = date.getMonth() + 1; // 1-12
    const year = date.getFullYear(); // e.g., 2024
    const totalPrice = parseFloat(invoice.totalPrice) || 0;

    if (user._id === invoice.sellerId && year === selectedYear) {
      const monthYear = `${month}-${year}`;
      if (monthlyRevenue[monthYear]) {
        monthlyRevenue[monthYear] += totalPrice;
      } else {
        monthlyRevenue[monthYear] = totalPrice;
      }
    }
  });
  const getRandomColor = (mul) => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * mul)];
    }
    return color;
  };

  // Function to generate an array of random colors for the dataset
  const generateRandomColors = (numColors, mul) => {
    return Array.from({ length: numColors }, () => getRandomColor(mul));
  };
  // Extract labels (month-year) and data (revenue per month) from the grouped object
  const labels = Object.keys(monthlyRevenue);

  // Sort the labels in chronological order
  const sortedLabels = labels.sort((a, b) => {
    const [monthA, yearA] = a.split("-").map(Number);
    const [monthB, yearB] = b.split("-").map(Number);

    if (yearA === yearB) {
      return monthA - monthB;
    } else {
      return yearA - yearB;
    }
  });

  const sortedRevenues = sortedLabels.map((label) => monthlyRevenue[label]);
  const randomColors = generateRandomColors(sortedLabels.length, 16);
  const randomColorsBar = generateRandomColors(sortedLabels.length, 12);
  const randomColorsDoughnut = generateRandomColors(sortedLabels.length, 14);
  const randomColorsPolar = generateRandomColors(sortedLabels.length, 11);
  const dataLine = {
    labels: sortedLabels,
    datasets: [
      {
        label: `Monthly Revenue (${selectedYear})`,
        data: sortedRevenues,
        borderColor: "#563b2b",
        backgroundColor: "#563b2bb0",
        pointStyle: "rectRot",
        pointRadius: 10,
        pointHoverRadius: 14,
        pointHoverBorderWidth: 4,
        pointHoverBorderColor: "#f1650076",
      },
    ],
  };
  const dataPie = {
    labels: sortedLabels,
    datasets: [
      {
        label: `Monthly Revenue (${selectedYear})`,
        data: sortedRevenues,
        backgroundColor: randomColors,
        hoverOffset: 20,
      },
    ],
  };
  const dataDoughnut = {
    labels: sortedLabels,
    datasets: [
      {
        label: `Monthly Revenue (${selectedYear})`,
        data: sortedRevenues,
        backgroundColor: randomColorsDoughnut,
        hoverOffset: 20,
      },
    ],
  };
  const dataPolar = {
    labels: sortedLabels,
    datasets: [
      {
        label: `Monthly Revenue (${selectedYear})`,
        data: sortedRevenues,
        backgroundColor: randomColorsPolar,
        hoverOffset: 10,
      },
    ],
  };
  const dataBar = {
    labels: sortedLabels,
    datasets: [
      {
        label: `Monthly Revenue (${selectedYear})`,
        data: sortedRevenues,
        backgroundColor: randomColorsBar,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
          },
        },
        display: true,
        position: "bottom",
      },
      title: {
        font: {
          size: 20,
        },
        display: true,
        text: `Revenue per Month for ${selectedYear}`,
      },
    },
  };

  // Extract available years from invoices to populate the dropdown
  const availableYears = [
    ...new Set(
      invoices.map((invoice) =>
        new Date(invoice.bookingStartDate).getFullYear()
      )
    ),
  ];

  return (
    <div style={{ paddingLeft: "11rem", backgroundColor:"black",paddingTop:"3rem" }} className="off">
      <select
        className="year-select"
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div className="charts">
        <Pie options={options} data={dataPie} className="grid-item" />
        <Doughnut options={options} data={dataDoughnut} className="grid-item" />
        <Line options={options} data={dataLine} className="grid-item" />
        <Bar options={options} data={dataBar} className="grid-item" />
        <PolarArea options={options} data={dataPolar} className="grid-item" />
      </div>
    </div>
  );
};

export default ChartLine;
