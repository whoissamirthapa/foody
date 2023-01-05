import { Request, Response } from "express";
import ContactUs from "../model/company_profile.model.js";

export const getContactUs = async (req: Request, res: Response) => {
  const { name, address_location, email, mobile_no, subject, message } =
    req.body;
  console.log(req.body);
  try {
    const contactUs = new ContactUs({
      name,
      address_location,
      email,
      mobile_no,
      subject,
      message,
    });
    await contactUs.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Message send error!" });
  }
};
