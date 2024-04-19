'use client';
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const qrcodeRegionId = 'html5qr-code-full-region';

export default function QrcodeReader({
  onScanSuccess,
  onScanFailure,
}) {
  const config = { fps: 1, qrbox: { width: 250, height: 250 } };
  const [cameraPermission, setCameraPermission] = useState(false);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [cameras, setCameras] = useState<any>([]);
  const [html5QrcodeScanner, setHtml5QrcodeScanner] = useState<any>(null);

  const fetchCameras = async () => {
    try {
      const cameras = await Html5Qrcode.getCameras();
      if (cameras.length > 0) {
        const formattedCameras = cameras.map((camera) => ({
          value: camera.id,
          label: camera.label || `Camera ${camera.id}`,
        }));
        setCameras(formattedCameras);
        setSelectedCameraId(formattedCameras[0].value);
        setCameraPermission(true);
      }
    } catch (error) {
      console.error('Failed to fetch cameras:', error);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  useEffect(() => {
    if (!onScanSuccess || !onScanFailure) {
      throw new Error('Required callback.');
    }

    const scanner = new Html5Qrcode(qrcodeRegionId);
    setHtml5QrcodeScanner(scanner);
    return () => scanner.clear();
  }, [onScanSuccess, onScanFailure]);

  return (
    <div className='container mx-auto'>
      <div className='max-w-screen-lg' id={qrcodeRegionId} />
      <div>
        {cameras.length > 0 ? (
          <Select
            name='camera'
            options={cameras}
            value={cameras.find((camera: any) => camera.value === selectedCameraId)}
            placeholder='カメラを選択'
            onChange={async (camera) => setSelectedCameraId(camera.value)}
          />
        ) : (
          <p>カメラがありません</p>
        )}
      </div>
      <div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded mr-2' onClick={fetchCameras}>
          カメラ取得
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded mr-2' onClick={async () => await html5QrcodeScanner.start(selectedCameraId, config, onScanSuccess, onScanFailure)} disabled={!cameraPermission && !selectedCameraId}>
          スキャン開始
        </button>
        <button className='bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded' onClick={async () => await html5QrcodeScanner.stop()}>
          スキャン停止
        </button>
      </div>
    </div>
  );
}
