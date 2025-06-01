import { QRCodeCanvas } from 'qrcode.react';
import React, { useState } from 'react';

function parseEMVQR(payload) {
  const result = {};
  let index = 0;

  while (index < payload.length) {
    const id = payload.substr(index, 2);
    const length = parseInt(payload.substr(index + 2, 2), 10);
    const value = payload.substr(index + 4, length);

    // Check if value is a sub-TLV (nested field like 38 or 62)
    if (id === '38' || id === '62') {
      result[id] = parseEMVQR(value);
    } else {
      result[id] = value;
    }

    index += 4 + length;
  }

  return result;
}

function PremiumDetail() {
  const [text, setText] = useState('00020101021238570010A000000727012700069704220113VQRQACRFW72580208QRIBFTTA53037045405100005802VN62060802Hi630408CC');
  const [parsedData, setParsedData] = useState(() => parseEMVQR(text));

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    try {
      const parsed = parseEMVQR(newText);
      setParsedData(parsed);
    } catch (err) {
      setParsedData({ error: 'Invalid payload' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">VietQR Generator</h2>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="border px-2 py-1 mb-4 w-full"
        placeholder="Enter VietQR payload"
      />
      <QRCodeCanvas value={text} size={256} className="mb-4" />

      <h3 className="font-semibold">Parsed Data:</h3>
      <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
        {JSON.stringify(parsedData, null, 2)}
      </pre>
    </div>
  );
}

export default PremiumDetail;
