import { useState, useEffect, useCallback } from 'react';

/**
 * @param {MediaDeviceKind} mediaType  Filters devices based on their type. If 'undefined', returns all devices.
 */
const useDevices = (mediaType?:  MediaDeviceKind) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  const refreshDevice = useCallback(async () => {
    await navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        if (mediaType) {
          devices = devices.filter((d) => d.kind === mediaType)
        }

        setDevices(devices)
      })
      .catch((error) => console.error(error));
  }, [mediaType]);

  useEffect(() => {
    refreshDevice();

    navigator.mediaDevices.addEventListener("devicechange", refreshDevice)

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        refreshDevice,
      )
    }
  }, [refreshDevice])

  return devices;
}

export default useDevices;
