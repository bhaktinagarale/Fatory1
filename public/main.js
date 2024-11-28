// Function to show the Add Orders popup
document.querySelector('.addOrderButton .btn').addEventListener('click', function () {
  document.getElementById('addOrderFormContainer').classList.add('active-popup');
});

// Function to hide the Add Orders popup
document.getElementById('close-addOrderForm-button').addEventListener('click', function () {
  document.getElementById('addOrderFormContainer').classList.remove('active-popup');
});

// Function to handle form submission
document.getElementById('addOrderForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Get form data
  const orderData = {
      id: document.getElementById('id').value,
      Season: document.getElementById('Season').value,
      Style: document.getElementById('Style').value,
      OrderNo: document.getElementById('OrderNo').value,
      Buyer: document.getElementById('buyer').value,
      Qty: document.getElementById('Qty').value,
      ExFacDate: document.getElementById('ExFacDate').value,
      Type: document.getElementById('Type').value,
      Status: document.getElementById('Status').value,
      Owner: document.getElementById('Owner').value
  };

  try {
      // Call the API to save the order data
      const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
      });

      // Trigger order tracking creation
      await fetch('/api/ordertracking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ OrderNo: orderData.OrderNo })
      });

      if (response.ok) {
          // Add the order data to the table
          addOrderToTable(orderData);

          // Reset the form
          document.getElementById('addOrderForm').reset();

          // Hide the popup
          document.getElementById('addOrderFormContainer').classList.remove('active-popup');
      } else {
          console.error('Error adding order:', response.statusText);
      }

      // Fetch updated orders to ensure the table is up-to-date
      fetchOrders();
  } catch (error) {
      console.error('Error:', error);
  }
});

// Function to add an order to the table dynamically
function addOrderToTable(order) {
  const tableBody = document.querySelector('#orderTable tbody');
  const row = document.createElement('tr');

  // Insert cells into the row
  row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.Season}</td>
      <td>${order.Style}</td>
      <td>${order.OrderNo}</td>
      <td>${order.Buyer}</td>
      <td>${order.Qty}</td>
      <td>${order.ExFacDate}</td>
      <td>${order.Type}</td>
      <td>${order.Status}</td>
      <td>${order.Owner}</td>
  `;

  // Append the row to the table
  tableBody.appendChild(row);
}

// Fetching existing orders from the API and populating the table
async function fetchOrders() {
  try {
      const response = await fetch("/api/orders");
      const orders = await response.json();

      // Clear existing rows
      const tableBody = document.querySelector('#orderTable tbody');
      tableBody.innerHTML = '';

      // Loop through each order and add it to the table
      orders.forEach((order) => {
          const orderData = {
              id: order.id,
              Season: order.Season,
              Style: order.Style,
              OrderNo: order.OrderNo,
              Buyer: order.Buyer,
              Qty: order.Qty,
              ExFacDate: order.ExFacDate,
              Type: order.Type,
              Status: order.Status,
              Owner: order.Owner
          };
          addOrderToTable(orderData);
      });
  } catch (error) {
      console.error("Error fetching orders:", error);
  }
}

// Call the fetchOrders function on page load to populate the table
window.onload = fetchOrders;
