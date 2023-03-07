import cors from 'utils/cors';

export default async function handler(req, res) {
  await cors(req, res);
  const { column, columns, columnsOrder } = req.body;
  const result = {
    columns: [...columns, column],
    columnsOrder: [...columnsOrder, column.id]
  };

  return res.status(200).json({
    ...result
  });
}
