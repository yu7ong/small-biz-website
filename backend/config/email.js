import nodemailer from 'nodemailer';

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

const createCustomerEmailTemplate = (orderData) => {
    const { orderId, customerName, items, totalAmount, email, _ } = orderData;

    return {
        from: process.env.BUSINESS_EMAIL,
        to: email,
        subject: `Order Confirmation - #${orderId}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for your order!</h2>
        
        <p>Hi ${customerName},</p>
        
        <p>We've received your order and are excited to get your items ready for you!</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Order Details</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
          
          <h4>Items Ordered:</h4>
          <ul>
            ${items.map(item => `
              <li>${item.productName} (${item.variantName}) (Qty: ${item.quantity}) - $${item.totalPrice.toFixed(2)}</li>
            `).join('')}
          </ul>
        </div>
        
        <p>We'll be in touch soon with updates on your order status.</p>
        <p><strong>Please wait for your order to be approved by us, which typically takes one week.</strong> We will notify you through this email thread.</p>
        <p>Thank you for supporting our small business!</p>
        
        <p>Best regards,<br>${process.env.BUSINESS_NAME}</p>
        
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          If you have any questions, please reply to this email.
        </p>
      </div>
    `,
    };
}

const createSellerEmailTemplate = (orderData) => {
    const { orderId, customerName, items, totalAmount, email, details, paymentImg } = orderData;

    return {
        from: process.env.BUSINESS_EMAIL,
        to: process.env.BUSINESS_EMAIL,
        subject: `New Order Received - #${orderId}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Order Received!</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3 style="margin-top: 0;">Order Information</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
          ${details ? `<p><strong>Special Instructions:</strong> ${details}</p>` : ''}
          
          <h4>Items Ordered:</h4>
          <ul>
            ${items.map(item => `
              <li>${item.productName} - ${item.variantName} (Qty: ${item.quantity}) - $${item.totalPrice.toFixed(2)}</li>
            `).join('')}
          </ul>
        </div>

        ${paymentImg
                ? `<div style="margin: 20px 0;">
                <h4>Payment Proof:</h4>
                <img src="${paymentImg}" alt="Payment Screenshot" style="max-width: 100%; border: 1px solid #ccc; border-radius: 5px;" />
              </div>`
                : ''
            }
        
        <p><strong>Action Required:</strong> Please process this order and update the customer on fulfillment timeline.</p>
      </div>
    `,
    };
};

export const sendEmail = async (orderData) => {
    const transporter = createTransporter();
    try {
        const customerEmail = createCustomerEmailTemplate(orderData);
        await transporter.sendMail(customerEmail);
        const sellerEmail = createSellerEmailTemplate(orderData);
        await transporter.sendMail(sellerEmail);
        return { success: true };

    } catch (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send order confirmation emails');
    }

}


export const testEmailConnection = async () => {
    const transporter = createTransporter();

    try {
        await transporter.verify();
        console.log('SMTP connection verified successfully');
        return true;
    } catch (error) {
        console.error('SMTP connection failed:', error);
        return false;
    }
};