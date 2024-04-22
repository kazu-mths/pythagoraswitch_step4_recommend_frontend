'use client';
import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import Select from 'react-select';

interface QrcodeReaderProps {
  onScanSuccess: (result: any) => void;
  onScanFailure: (error: any) => void;
}

const qrcodeRegionId = 'html5qr-code-full-region';

export default function QrcodeReader({
  onScanSuccess,
  onScanFailure,
}: {
onScanSuccess: any;
onScanFailure: any;
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
      <div className='mt-2'>
        <button className='border-2 border-black bg-white hover:bg-black text-black hover:text-white text-sm font-bold py-1 px-2 rounded-full mr-2' onClick={fetchCameras}>
          setting
        </button>
        <button className='border-2 border-black bg-white hover:bg-black text-black hover:text-white text-sm font-bold py-1 px-2 rounded-full mr-2' onClick={async () => await html5QrcodeScanner.start(selectedCameraId, config, onScanSuccess, onScanFailure)} disabled={!cameraPermission && !selectedCameraId}>
          scan
        </button>
        <button className='border-2 border-black bg-white hover:bg-black text-black hover:text-white text-sm font-bold py-1 px-2 rounded-full mr-2' onClick={async () => await html5QrcodeScanner.stop()}>
          stop
        </button>
      </div>
    </div>
  );
}
