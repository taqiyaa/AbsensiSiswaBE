import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { guru } from '../db/guru.js';

const SECRET_KEY = 'RAHASIA_NEGARA';

export async function register(
  req: Request,
  res: Response
) {
  try {
    const {
      namaGuru,
      npmGuru,
      email,
      password
    } = req.body;

    if (
      !namaGuru ||
      !npmGuru ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: 'Nama Guru, NPM Guru, Email, dan Password wajib diisi'
      });
    }

    const existingGuru = await db
      .select()
      .from(guru)
      .where(eq(guru.email, email));

    if (existingGuru.length > 0) {
      return res.status(400).json({
        message: 'Email sudah terdaftar'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(guru).values({
      namaGuru,
      npmGuru,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: 'Registrasi berhasil'
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server'
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email dan Password wajib diisi'
      });
    }

    const result = await db
      .select()
      .from(guru)
      .where(eq(guru.email, email));

    if (result.length === 0) {
      return res.status(401).json({
        message: 'Email atau Password salah'
      });
    }

    const dataGuru = result[0]!;

    const isMatch = await bcrypt.compare(
      password,
      dataGuru.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: 'Email atau Password salah'
      });
    }

    const token = jwt.sign(
      {
        id: dataGuru.id,
        email: dataGuru.email
      },
      SECRET_KEY,
      {
        expiresIn: '1d'
      }
    );

    return res.json({
      message: 'Login berhasil',
      token,
      guru: {
        id: dataGuru.id,
        namaGuru: dataGuru.namaGuru,
        email: dataGuru.email
      }
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server'
    });
  }
}