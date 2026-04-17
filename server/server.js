app.post('/api/orders', async (req, res) => {
  const { customer, items, total } = req.body;

  const itemList = items
    .map(
      (item) =>
        `${item.name} | Item Code: ${item.sku} | Qty: ${item.quantity} | $${item.price} | Line: $${item.price * item.quantity}`
    )
    .join('\n');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Order Request',
      text: `
New Order Received

Name: ${customer.name}
Email: ${customer.email}
Address: ${customer.address}

Items:
${itemList}

Total: $${total}
      `,
    });

    res.json({ message: 'Order emailed successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});