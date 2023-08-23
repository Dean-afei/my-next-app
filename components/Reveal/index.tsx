import React, { useRef, useState } from "react";
import Chart from "../Chart";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function Reveal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coin, setCoin] = useState("");
  const [isReveal, setIsReveal] = useState(false);
  const [isInit, setIsInit] = useState(true);
  //   const [nodata, setNodata] = useState(true);
  //   const [isLoading, setIsLoading] = useState(false);
  const coinRef = useRef("BTC");

  const handleCoinChange = (e: any) => {
    setCoin(e.target.value);
  };

  const handleClose = () => {
    onClose();
    setCoin("");
  };

  const handleSearch = () => {
    coinRef.current = coin;
    onClose();
    setCoin("");
    setIsInit(false);
  };

  const handleConnected = (state: number, data: any) => {
    if (data) {
      setIsReveal(true);
    } else {
      setIsReveal(false);
    }
    if (state === 0) {
      //   setIsLoading(true);
      setIsReveal(false);
    } else if (state === 1) {
      //   setIsLoading(false);
      setIsReveal(true);
    } else {
      setIsReveal(false);
      //   setIsLoading(false);
    }
  };

  return (
    <>
      <div className="chart-content">
        {isReveal && !isInit ? null : (
          <div className="overlay">
            <AddIcon
              boxSize={4}
              color="white"
              onClick={onOpen}
              cursor="pointer"
            />
          </div>
        )}
        <header className="chart-header">
          {coinRef.current.toUpperCase()}
        </header>
        <Chart coin={coinRef.current} onConnected={handleConnected} />
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter the currency</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="BTC" value={coin} onChange={handleCoinChange} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button colorScheme="orange" onClick={handleSearch}>
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Reveal;
