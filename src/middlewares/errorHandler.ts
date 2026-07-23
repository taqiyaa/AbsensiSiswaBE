import type {
  Request,
  Response,
  NextFunction
} from 'express';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err?.cause?.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      success: false,
      message: 'Data relasi tidak ditemukan.',
      detail: err.cause.sqlMessage
    });
  }

  if (err?.cause?.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      success: false,
      message: 'Data sudah ada.',
      detail: err.cause.sqlMessage
    });
  }

  if (err?.cause?.code === 'ER_DATA_TOO_LONG') {
    return res.status(400).json({
      success: false,
      message: 'Data terlalu panjang.',
      detail: err.cause.sqlMessage
    });
  }


  if (err?.cause?.code === 'ER_BAD_NULL_ERROR') {
    return res.status(400).json({
      success: false,
      message: 'Ada kolom yang wajib diisi.',
      detail: err.cause.sqlMessage
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    detail: err.message
  });
}