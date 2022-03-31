import React, { useState, useEffect } from "react"
import "./Departments.scss"
import BarChart from "./Components/Barchart"
import { RootState } from "../../../../../Store"
import { useSelector } from "react-redux"

export interface departments {
  name: string
  tasks: number
}

const Departments = () => {
  const [departmentData, setDepartmentData] = useState<Array<departments>>([])

  const activeProject = useSelector(
    (state: RootState) => state.projectsData.activeProject
  )

  useEffect(() => {
    const data: Array<departments> = []

    const pushDepartment = (name: string) => {
      const departmentObj = { name: name, tasks: 1 }
      data.push(departmentObj)
    }

    activeProject.tasks.map((project) => {
      if (data.length) {
        let newObj = data.find(
          (department) => department.name === project.department
        )
        if (newObj) {
          newObj = { ...newObj, tasks: newObj.tasks++ }
          let newData = data.filter(
            (department) => department.name !== project.name
          )
        } else {
          pushDepartment(project.department)
        }
      } else {
        pushDepartment(project.department)
      }
    })
    setDepartmentData(data)
  }, [activeProject])

  return (
    <div className="dashboard-departments-container">
      <h1>Departments Workload</h1>
      <BarChart departmentData={departmentData} />
    </div>
  )
}

export default Departments
