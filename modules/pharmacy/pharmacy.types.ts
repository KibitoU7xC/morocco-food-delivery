/**
 * Pharmacy Types
 */

export interface PharmacyStore {
  id: number;
  name: string;
  logo: string | null;
  cover_image: string | null;
  description: string | null;
  latitude: string;
  longitude: string;
  category_id: number;
  is_open?: boolean;
}

export interface PrescriptionUpload {
  file: File | Blob;
  patient_name?: string;
  notes?: string;
}

export interface PharmacyProduct {
  id: number;
  merchant_id: number;
  name: string;
  description: string;
  price: string;
  in_stock: boolean;
  requires_prescription?: boolean;
  dosage?: string;
}
