import { describe, expect, it } from "vitest";
import {
  ageOn,
  isProfileComplete,
  isValidBirthDate,
  isValidNisnNim,
  missingProfileFields,
  needsGuardian,
  parseCoordinates,
  sameName,
  type ProfileCompletion,
} from "@/lib/profile";

const TODAY = "2026-10-09";

const adult: ProfileCompletion = {
  full_name: "Rega Rizkan",
  phone: "0812 3456 7890",
  birth_date: "2000-05-01",
  is_adult: true,
  guardian_name: null,
  guardian_phone: null,
  school_name: "Universitas Borneo Tarakan",
  nisn_nim: "1907051001",
  address: "Jl. Mulawarman No. 12, RT 03, Karang Anyar, Tarakan Barat",
  latitude: 3.3,
  longitude: 117.6,
};

describe("ageOn", () => {
  it("counts whole years and handles the day before a birthday", () => {
    expect(ageOn("2005-10-09", TODAY)).toBe(21);
    expect(ageOn("2005-10-10", TODAY)).toBe(20);
    expect(ageOn("2005-11-01", TODAY)).toBe(20);
  });
});

describe("isValidBirthDate", () => {
  it("rejects future, impossible, and malformed dates", () => {
    expect(isValidBirthDate("2027-01-01", TODAY)).toBe(false);
    expect(isValidBirthDate("2010-02-30", TODAY)).toBe(false);
    expect(isValidBirthDate("10/02/2010", TODAY)).toBe(false);
    expect(isValidBirthDate(null, TODAY)).toBe(false);
    expect(isValidBirthDate("2010-02-28", TODAY)).toBe(true);
  });
});

describe("needsGuardian", () => {
  it("is true below 21 and false from the 21st birthday", () => {
    expect(needsGuardian("2005-10-10", TODAY)).toBe(true);
    expect(needsGuardian("2005-10-09", TODAY)).toBe(false);
  });
});

describe("missingProfileFields", () => {
  it("accepts a complete profile that ticked 21+ without guardian details", () => {
    expect(missingProfileFields(adult, TODAY)).toEqual([]);
    expect(isProfileComplete(adult, TODAY)).toBe(true);
  });

  it("requires guardian name and phone when the 21+ box is not ticked", () => {
    const unticked = { ...adult, is_adult: false };
    expect(missingProfileFields(unticked, TODAY)).toEqual(["Nama orang tua/wali", "Nomor HP orang tua/wali"]);
    expect(isProfileComplete({ ...unticked, guardian_name: "Siti Aminah", guardian_phone: "0812 9876 5432" }, TODAY)).toBe(true);
  });

  it("does not let a minor skip the guardian by ticking 21+", () => {
    const minor = { ...adult, birth_date: "2012-03-15" };
    expect(missingProfileFields(minor, TODAY)).toEqual([
      'Centang "di atas 21 tahun" tidak sesuai tanggal lahir',
      "Nama orang tua/wali",
      "Nomor HP orang tua/wali",
    ]);
    expect(isProfileComplete({ ...minor, is_adult: false, guardian_name: "Siti Aminah", guardian_phone: "081298765432" }, TODAY)).toBe(true);
  });

  it("requires a school or campus and a NISN/NIM", () => {
    expect(missingProfileFields({ ...adult, school_name: null, nisn_nim: null }, TODAY)).toEqual(["Asal sekolah/kampus", "NISN/NIM"]);
  });

  it("lists every missing field for a fresh account", () => {
    expect(
      missingProfileFields(
        { full_name: "Budi", phone: null, birth_date: null, is_adult: false, guardian_name: null, guardian_phone: null, school_name: null, nisn_nim: null, address: null, latitude: null, longitude: null },
        TODAY
      )
    ).toEqual([
      "Nomor WhatsApp",
      "Tanggal lahir",
      "Nama orang tua/wali",
      "Nomor HP orang tua/wali",
      "Asal sekolah/kampus",
      "NISN/NIM",
      "Alamat lengkap domisili",
      "Titik lokasi (koordinat)",
    ]);
  });

  it("rejects a too-short address and a 0,0 location", () => {
    expect(missingProfileFields({ ...adult, address: "Tarakan" }, TODAY)).toEqual(["Alamat lengkap domisili"]);
    expect(missingProfileFields({ ...adult, latitude: 0, longitude: 0 }, TODAY)).toEqual(["Titik lokasi (koordinat)"]);
  });
});

describe("isValidNisnNim", () => {
  it("accepts a 10-digit NISN and campus NIM formats", () => {
    expect(isValidNisnNim("0081234567")).toBe(true);
    expect(isValidNisnNim("A11.2020.12345")).toBe(true);
    expect(isValidNisnNim("19/445566/SA/12345")).toBe(true);
  });

  it("rejects short, spaced or digit-less values", () => {
    expect(isValidNisnNim("1234")).toBe(false);
    expect(isValidNisnNim("0081 234567")).toBe(false);
    expect(isValidNisnNim("ABCDEFG")).toBe(false);
    expect(isValidNisnNim(null)).toBe(false);
  });
});

describe("parseCoordinates", () => {
  it("reads plain pairs", () => {
    expect(parseCoordinates("3.3005, 117.6331")).toEqual({ latitude: 3.3005, longitude: 117.6331 });
    expect(parseCoordinates("-6.2 106.8")).toEqual({ latitude: -6.2, longitude: 106.8 });
  });

  it("reads Google Maps links", () => {
    expect(parseCoordinates("https://www.google.com/maps/@3.3005,117.6331,17z")).toEqual({ latitude: 3.3005, longitude: 117.6331 });
    expect(parseCoordinates("https://maps.google.com/?q=3.3005,117.6331")).toEqual({ latitude: 3.3005, longitude: 117.6331 });
    expect(
      parseCoordinates("https://www.google.com/maps/place/X/@3.30,117.63,17z/data=!3m1!4b1!4m6!3m5!1s0x0!8m2!3d3.3005!4d117.6331")
    ).toEqual({ latitude: 3.3005, longitude: 117.6331 });
  });

  it("returns null for text without valid coordinates", () => {
    expect(parseCoordinates("Jl. Mulawarman")).toBeNull();
    expect(parseCoordinates("95, 117")).toBeNull();
    expect(parseCoordinates("")).toBeNull();
  });
});

describe("sameName", () => {
  it("ignores case and extra spaces", () => {
    expect(sameName("Siti  Aminah ", "siti aminah")).toBe(true);
  });

  it("rejects different or empty names", () => {
    expect(sameName("Siti Aminah", "Siti Amina")).toBe(false);
    expect(sameName("", "")).toBe(false);
    expect(sameName(null, "Siti")).toBe(false);
  });
});
