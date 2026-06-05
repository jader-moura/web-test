const test = require('node:test');
const assert = require('node:assert');
const app = require('./index');

test('POST /transactions saves a valid transaction', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const base = `http://localhost:${port}`;

  try {
    const postRes = await fetch(`${base}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 100, description: 'Test payment' }),
    });

    assert.strictEqual(postRes.status, 201);

    const created = await postRes.json();
    assert.strictEqual(created.amount, 100);
    assert.strictEqual(created.description, 'Test payment');

    const getRes = await fetch(`${base}/transactions`);
    const list = await getRes.json();

    assert.ok(list.some((t) => t.id === created.id));
  } finally {
    server.close();
  }
});

test('POST /transactions rejects invalid input', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const base = `http://localhost:${port}`;

  try {
    const res = await fetch(`${base}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: -5, description: '' }),
    });

    assert.strictEqual(res.status, 400);
  } finally {
    server.close();
  }
});
