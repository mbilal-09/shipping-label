{
  /* <View className="bg-white border-[3px] border-black ">
                  <View className="flex flex-row items-start justify-between p-1">
                    <View className="text-sm ">
                      <Text>{data[0]}</Text>
                      <Text>1204723601</Text>
                      <Text>{data[2]}</Text>
                      <Text>{data[4] + " " + data[5] + " " + data[6]}</Text>
                    </View>
                    <View>
                      <Text className="font-bold text-md">{data[16]} LBS</Text>
                      <Text className=" text-sm">DWT:16,8,8</Text>
                    </View>
                    <View>
                      <Text className="font-bold text-lg">
                        {index + 1} OF {csvData.length}
                      </Text>
                    </View>
                  </View>
                  <View className="p-1">
                    <Text className="font-bold">SHIP TO:</Text>
                    <View className="ml-3">
                      <Text className="block -mb-1 m-0">{data[8]}</Text>
                      <Text className="block -mb-1 m-0">3131378163</Text>
                      <Text className="block -mb-1 m-0">{data[10]}</Text>
                      <Text className="block font-bold mb-1 text-2xl">
                        {data[12] + " " + data[13] + " " + data[14]}
                      </Text>
                    </View>
                  </View>
                  <View className="w-full h-[1px] bg-black"></View>
                  <View className="flex justify-between">
                    <View className="w-[30%] p-1">
                      <View className="w-[100px] flex items-center justify-center mx-auto"></View>
                    </View>
                    <View className="w-[70%]  border-l-[1px] border-black p-1">
                      <Text className="font-bold text-3xl mb-4">
                        IL 626 9-49
                      </Text>
                      <View className="w-[200px] mx-auto">
                        <Barcode
                          value="barcode-example"
                          height={50}
                          width={0.9}
                          displayValue={false}
                        />
                      </View>
                    </View>
                  </View>
                  <View className="w-full h-[6px] bg-black"></View>
                  <View className="flex flex-row items-start justify-between">
                    <View>
                      <Text className="font-bold text-3xl">
                        UPS 2ND DAY AIR
                      </Text>
                      <Text className="">TRACKING #: {trackingId}</Text>
                    </View>
                    <View>
                      <Text className="font-bold text-5xl">2</Text>
                    </View>
                  </View>
                  <View className="w-full mt-2 h-[2px] bg-black"></View>
                  <View className="flex justify-center">
                    <Barcode
                      value={trackingId}
                      height={70}
                      width={1}
                      displayValue={false}
                    />
                  </View>
                  <View className="w-full h-[6px] bg-black"></View>
                  <View>
                    <Text className="text-sm">BILLING: P/P</Text>
                    <Text className="text-sm">DESC: {data[20]}</Text>
                    <Text className="mt-1 font-medium text-sm">
                      REF #1: {data[21]}
                    </Text>
                  </View>
                  <View className="flex items-end justify-end mt-4 p-1">
                    <Text className="text-sm">
                      ISH 13.00F LASER 15.5V 01/2024
                    </Text>
                  </View>
                </View> */
}

<div className="flex justify-start space-x-4 p-2 overflow-x-scroll">
  {csvData
    ? csvData.length > 0 &&
      csvData?.map((data, index) => {
        let trackingId = randomAlphanumeric(18, "uppercase");
        return (
          <div className="w-[400px]" key={index} id={`content-id-${index}`}>
            {/* <button onClick={() => generatePDF(getTargetElement, options)}>Download PDF</button> */}
            <div className="bg-white border-[3px] border-black ">
              <div className="flex flex-row items-start justify-between p-1">
                <div className="text-sm ">
                  <p>{data[0]}</p>
                  <p>1204723601</p>
                  <p>{data[2]}</p>
                  <p>{data[4] + " " + data[5] + " " + data[6]}</p>
                </div>
                <div>
                  <p className="font-bold text-md">{data[16]} LBS</p>
                  <p className=" text-sm">DWT:16,8,8</p>
                </div>
                <div>
                  <p className="font-bold text-lg">
                    {" "}
                    {index + 1} OF {csvData.length}
                  </p>
                </div>
              </div>
              <div className="p-1">
                <p className="font-bold">SHIP TO:</p>
                <div className="ml-3">
                  <span className="block -mb-1 m-0">{data[8]}</span>
                  <span className="block -mb-1 m-0">3131378163</span>
                  <span className="block -mb-1 m-0">{data[10]}</span>
                  <span className="block font-bold mb-1 text-2xl">
                    {data[12] + " " + data[13] + " " + data[14]}
                  </span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-black"></div>
              <div className="flex justify-between">
                <div className="w-[30%] p-1">
                  <div className="w-[100px] flex items-center justify-center mx-auto"></div>
                </div>
                <div className="w-[70%]  border-l-[1px] border-black p-1">
                  <p className="font-bold text-3xl mb-4">IL 626 9-49</p>
                  <div className="w-[200px] mx-auto">
                    <Barcode
                      value="barcode-example"
                      height={50}
                      width={0.9}
                      displayValue={false}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-[6px] bg-black"></div>
              <div className="flex flex-row items-start justify-between">
                <div>
                  <p className="font-bold text-3xl">UPS 2ND DAY AIR</p>
                  <p className="">TRACKING #: {trackingId}</p>
                </div>
                <div>
                  <p className="font-bold text-5xl">2</p>
                </div>
              </div>
              <div className="w-full mt-2 h-[2px] bg-black"></div>
              <div className="flex justify-center">
                <Barcode
                  value={trackingId}
                  height={70}
                  width={1}
                  displayValue={false}
                />
              </div>
              <div className="w-full h-[6px] bg-black"></div>
              <div>
                <p className="text-sm">BILLING: P/P</p>
                <p className="text-sm">DESC: {data[20]}</p>
                <p className="mt-1 font-medium text-sm">REF #1: {data[21]}</p>
              </div>
              <div className="flex items-end justify-end mt-4 p-1">
                <p className="text-sm">ISH 13.00F LASER 15.5V 01/2024</p>
              </div>
            </div>
          </div>
        );
      })
    : ""}
</div>;
