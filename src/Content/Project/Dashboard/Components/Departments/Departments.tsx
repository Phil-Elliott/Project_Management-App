import React, { useState, useEffect } from "react"
import "./Departments.scss"
import BarChart from "./Components/Barchart"
import { RootState } from "../../../../../Store"
import { useSelector } from "react-redux"
import Project from "../../../Project"

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
        // console.log(newObj)
        if (newObj) {
          newObj = { ...newObj, tasks: newObj.tasks++ }
          let newData = data.filter(
            (department) => department.name !== project.name
          )
          // console.log(newData)
          // data.push(newObj)
        } else {
          pushDepartment(project.department)
        }
      } else {
        pushDepartment(project.department)
      }
    })
    setDepartmentData(data)
  }, [activeProject])

  /*

  have two unctions (add and add 1)
    
    - two arrays that we are working with 
    - need to either 
          add 1 to it 
          push in new obj 


          check if it contains the department 
          if it does then map through and add 1 
          else push in new obj 
          

  activeProject.tasks.map((project) => {
      if (departmentData.length) {
        setDepartmentData([
          ...departmentData.filter((department) => {
            if (department.name === project.department) {
              return (department.tasks += 1)
            } else {
              return { name: project.department, tasks: 1 }
            }
          }),
        ])
      } else {
        setDepartmentData([{ name: project.department, tasks: 1 }])
      }
    })


  */

  return (
    <div className="dashboard-departments-container">
      <h1>Departments Work Load</h1>
      <BarChart departmentData={departmentData} />
    </div>
  )
}

export default Departments

/*
    could do two function 

      map through active project tasks 
      call on other function to filter into state with object 



      

*/
