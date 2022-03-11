import React, { useState, useEffect } from "react"

const ModalInput = ({
  question,
  type,
  display,
}: {
  question: string
  type: string
  display: boolean
}) => {
  const [inputData, setInputData] = useState("")

  const change = (e: any) => {
    setInputData(e)
    console.log(inputData)
  }

  // useEffect(() => {
  //   changeBadgeDetails(id, inputData)
  // }, [inputData])

  useEffect(() => {
    setInputData("")
  }, [display])

  return (
    <div>
      <div>
        <h2>{question}</h2>
        <input
          type={type}
          placeholder="answer"
          value={inputData}
          onChange={(e) => change(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ModalInput
