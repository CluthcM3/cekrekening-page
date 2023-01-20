import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import qs from "qs";
import { MdPersonSearch } from "react-icons/md";
import { BsBank2, BsFillCreditCardFill } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";

async function ListBank() {
  try {
    const response = await axios.get("https://cekrek.heirro.dev/api/check", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch {
    console.log("error");
  }
}

async function getRek(accountBank, accountNumber) {
  try {
    const response = await axios.post(
      "https://cekrek.heirro.dev/api/check",
      qs.stringify({
        accountBank: accountBank,
        accountNumber: accountNumber,
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch {
    console.log("error");
  }
}

function Cekrek() {
  const [typeBank, setTypeBank] = useState();
  const [description, setDescription] = useState();
  const [finish, setFinish] = useState([1]);
  const [already, setAlready] = useState(false);
  const valueonselect = useRef();
  const number = useRef();

  // get api
  useEffect(() => {
    async function dataBank() {
      const list = await ListBank();
      const data = list.info.parameters.accountBank;
      const description = list.info.descriptions;
      setTypeBank(data);
      setDescription(description);

      // data.map((item, id) => {
      //   // push description to state setDescription
      //   setDescription((prev) => ({
      //     ...prev,
      //     [id]: description[item],
      //   }));
      // });
    }
    dataBank();
  }, []);

  async function ceknum() {
    if (
      number.current.value.length > 0 &&
      valueonselect.current.value.length > 0
    ) {
      const data = await getRek(
        valueonselect.current.value,
        number.current.value
      );

      setAlready(!already);
      setFinish(data.data);
    } else {
      console.log("data nggk boleh kosong");
    }
  }
  // console.log(finish[0].accountName);
  return (
    <div className="w-full h-full">
      <div className="h-32  md:w-[70%] w-[90%] mt-4 mx-auto text-center rounded-xl bg-[#e9ecef] ">
        <div className="pt-4">
          <h1 className="text-2xl font-bold">Cek Rekening</h1>
          <p>Anda ingin bertransaksi online?</p>
          <p>
            Ingin men-transfer sejumlah uang ke rekening yang anda baru kenal?
            Cek disini!
          </p>
        </div>
      </div>
      <div className="w-full md:h-[21rem] h-[36rem] flex justify-center">
        <div className="md:w-[70%] w-[90%] border shadow-md border-t-0 rounded-md mt-6 flex">
          <div className="md:w-[25%] hidden md:block">
            <div className="flex justify-center">
              <MdPersonSearch className="h-24 w-24 mt-6" />
            </div>
            <p className="mx-auto w-48 text-[12px] mt-2">
              Anda ingin bertransaksi online? Ingin men-transfer sejumlah uang
              ke rekening yang anda baru kenal? Cek disini!
            </p>
          </div>

          <div className="md:w-[75%] mt-3">
            <div className="block md:hidden">
              <div className="flex justify-center">
                <MdPersonSearch className="h-24 w-24 mt-6" />
              </div>
              <div className="mx-auto w-[90%] text-[12px] mt-2">
                <p className="">Anda ingin bertransaksi online?</p>
                <p>
                  Ingin men-transfer sejumlah uang ke rekening yang anda baru
                  kenal? Cek disini!
                </p>
              </div>
            </div>
            <p className="text-[12px] mt-5 w-[90%] mx-auto md:mx-0 md:w-full md:mt-0">
              Pilih <span className="font-bold">NAMA BANK</span> dan masukan
              nomor rekening, lalu tekan PERIKSA REKENING untuk melakukan
              pemeriksaan
            </p>
            <hr className="border-t-gray-300 w-[90%] mx-auto md:w-full md:mx-0 my-2 mb-5" />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-[90%] mx-auto md:w-full md:mx-0">
              Nama Bank atau e-Wallet
            </label>
            <div className="flex items-center w-[90%] mx-auto md:w-full md:mx-0">
              <BsBank2 className="mr-3" />
              <select
                ref={valueonselect}
                id="typeBank"
                className="w-[93%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {typeBank?.map((item, id) => (
                  <option value={item} key={id}>
                    {description[item]}
                  </option>
                ))}
              </select>
            </div>
            <label className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white w-[90%] mx-auto md:w-full md:mx-0">
              Nomor rekening
            </label>
            <div className="flex items-center w-[90%] mx-auto md:w-full md:mx-0">
              <BsFillCreditCardFill className="mr-3" />
              <input
                type="number"
                placeholder="Nomor Rekening"
                ref={number}
                className="w-[93%] p-2.5 border rounded-md outline-none focus:ring-red-500 focus:border-red-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end mr-5 md:mr-7">
              <button
                onClick={ceknum}
                className="p-2 pl-10 pr-5 bg-[#2558ab] text-white rounded-sm mt-5 "
              >
                <div className="flex items-center">
                  <p>Cek Sekarang</p>
                  <HiArrowLongRight className="ml-2 w-6 h-6 pt-0.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-28 flex justify-center ">
        {already && (
          <div className="md:w-[70%] mt-4 border shadow-md rounded-md w-[90%] mx-auto md:mx-0 ">
            <div className="mt-2 mx-6">
              <h1 className="mt-2">
                {finish[0]?.accountNumber} - {finish[0]?.accountBank}
              </h1>
              <h1 className="text-gray-400 font-medium mt-2">
                Nama Rekening : {finish[0]?.accountName}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cekrek;
