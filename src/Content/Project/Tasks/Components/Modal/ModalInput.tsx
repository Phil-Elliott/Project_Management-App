import React, { useState, useEffect } from "react"

const ModalInput = ({
  question,
  type,
  display,
  part,
  changeObjectData,
  value,
}: {
  question: string
  type: string
  display: boolean
  part: string
  changeObjectData: any
  value?: any
}) => {
  const [inputData, setInputData] = useState("")

  const change = (e: any) => {
    setInputData(e)
  }

  useEffect(() => {
    changeObjectData(part, inputData)
  }, [inputData])

  useEffect(() => {
    value ? setInputData(value) : setInputData("")
  }, [display])

  return (
    <div>
      <div>
        <h2>{question}</h2>
        <input
          type={type}
          placeholder=""
          value={inputData}
          onChange={(e) => change(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ModalInput
