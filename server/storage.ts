import { type User, type InsertUser, type PaymentSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

interface CreateLeadInput {
  fullName: string;
  email: string;
  phone: string;
  source: string;
  amount: number;
  status: string;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: CreateLeadInput): Promise<PaymentSubmission>;
  updateLeadStatus(id: string, status: string, razorpayOrderId?: string, razorpayPaymentId?: string): Promise<void>;
  getAllLeads(): Promise<PaymentSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, PaymentSubmission>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(lead: CreateLeadInput): Promise<PaymentSubmission> {
    const id = randomUUID();
    const newLead: PaymentSubmission = {
      id,
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      amount: lead.amount,
      status: lead.status,
      source: lead.source,
      razorpayOrderId: null,
      razorpayPaymentId: null,
      createdAt: new Date(),
    };
    this.leads.set(id, newLead);
    return newLead;
  }

  async updateLeadStatus(id: string, status: string, razorpayOrderId?: string, razorpayPaymentId?: string): Promise<void> {
    const lead = this.leads.get(id);
    if (lead) {
      lead.status = status;
      if (razorpayOrderId) lead.razorpayOrderId = razorpayOrderId;
      if (razorpayPaymentId) lead.razorpayPaymentId = razorpayPaymentId;
      this.leads.set(id, lead);
    }
  }

  async getAllLeads(): Promise<PaymentSubmission[]> {
    return Array.from(this.leads.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
