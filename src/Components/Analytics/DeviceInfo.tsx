function DeviceInfo({ deviceInfo }: any) {
  return (
    <>
      {deviceInfo ? (
        <div className="device-info-container flex-1 border-sky-500 border-2 bg-slate-50 rounded-md h-full w-full p-4">
          <div className="device-card-heading">
            <h1 className="text-sky-600 font-semibold text-2xl mb-2">
              Device Information
            </h1>
          </div>
          <div className="h-4/5">
            <div className="flex h-full">
              <div className="image-container flex justify-center items-center bg-gray-300 h-full rounded-md">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJAE1nyt35poNKjS1Eir6yhBGYlUW_CPq3g&usqp=CAU"
                  className="rounded-md"
                  width={"50%"}
                  height={"100%"}
                />
              </div>
              <div className="px-2">
                <p>
                  <strong className="text-cyan-500 p-2">Device ID:</strong>{" "}
                  {deviceInfo?.device_id}
                </p>
                <p>
                  <strong className="text-cyan-500 p-2">
                    Device Serial Number:
                  </strong>{" "}
                  {deviceInfo?.serial_number}
                </p>
                <p className="">
                  <strong className="text-cyan-500 p-2">Device Name:</strong>{" "}
                  {deviceInfo?.name}
                </p>
                <p className="text-yellow-500">
                  <strong className="text-cyan-500 p-2">Device Status: </strong>
                  <strong>{deviceInfo?.status}</strong>
                </p>
                <p>
                  <strong className="text-cyan-500 p-2">Device User: </strong>
                  {"1"}
                </p>
                <p>
                  <strong className="text-cyan-500 p-2">
                    Device Temperature:
                  </strong>
                  {deviceInfo?.temperature} Degrees
                </p>
                <p>
                  <strong className="text-cyan-500 p-2">
                    Device Humidity:
                  </strong>
                  {deviceInfo?.humidity} %
                </p>
                <p>
                  <strong className="text-cyan-500 p-2">
                    Device Description:{" "}
                  </strong>
                  {"lorem ipsum dolor sit amet lorem ."}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex device-info-container flex-1 border-sky-500 font-semibold border-2 bg-slate-50 rounded-md h-full w-full p-4 justify-center items-center">
          No Data to Display!
        </div>
      )}
    </>
  );
}

export default DeviceInfo;
