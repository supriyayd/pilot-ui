function DeviceInfo() {
  return (
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
          <div className="info-container flex-column p-2">
            <p className="">
              <strong className="text-cyan-500 p-2">Device Name:</strong>{" "}
              {"Polyjet 500"}
            </p>
            <p className="text-yellow-500">
              <strong className="text-cyan-500 p-2">Device Status: </strong>
              <strong>IDLE</strong>
            </p>
            <p>
              <strong className="text-cyan-500 p-2">Device User: </strong>
              {"Sample User"}
            </p>
            <p>
              <strong className="text-cyan-500 p-2">
                Device Temperature:{" "}
              </strong>
              {10} Degree Celsius
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
  );
}

export default DeviceInfo;
