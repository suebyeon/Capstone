1) Provide the techniques you used as a team to do the Exploratory Data Analysis.
Crosstabulation: I used crosstabs to display the relationship and total counts between two categorical variables, such as expertise match versus task completion status. This helped me quickly identify patterns and associations in the data.

Scatterplots: I was able to visualize trends and potential correlations between two variables, such as penalty costs and task priority.

Groupby Descriptive Statistics: By grouping data and calculating descriptive statistics (like min, max, mean, and standard deviation), I gained insights into the range and central tendencies of penalty costs across different task priority level.

Box and Whisker Plots: These plots allowed for examining the distribution, spread, and presence of outliers within groups, such as penalty costs or customer ratings by expertise match.

Bar Graphs: Bar graphs provided an effective way to compare rates or averages across categories, such as expertise match rates or customer rating by task completed or priority level.

2) What did you discover so far in your data? (Be specific and relate it to your project objective. Did it help you further refine or pivot your hypotheses? Did it point to additional or alternative data or questions?)

finding 1: 
The crosstab analysis shows that when expertise is matched, a higher number of tasks are completed successfully, supporting the hypothesis that aligning technician expertise with task requirements increases the likelihood of successful task completion. Interestingly, even among the incomplete tasks, there are still more instances where expertise was matched than not. Nonetheless, the overall trend indicates that expertise matching remains a positive factor, even if its impact alone is not strongly significant in this dataset.

finding 2:
Analysis showed that incompleted, expertise-matched tasks tend to have higher associated penalty costs. It is important to note the data source emphasizes penalty cost is determined by task priority. This reflects the company's practice of assigning high-priority, higher-risk tasks to technicians with matching expertise to minimize operational risk. It reveals that penalty cost and expertise match are capturing different dimensions of success: the former measures operational efficiency and risk, while the latter reflects the quality of task assignment. So while those metrics are not always directly correlated, it is important to measure them for different business purpose. For lower-priority tasks, expertise matching reduces penalty costs, while for higher-priority tasks, costs remain high due to inherent complexity, not technician mismatch.

finding 3: 
The spread of customer ratings is higher for completed tasks compared to those not completed, indicating that customers have more positive experiences when tasks are successfully completed. This suggests that the company should prioritize improving task completion rates, as it directly contributes to higher customer satisfaction.

finding 4: 
The distribution of Customer Ratings is relatively even across all levels, indicating that there is significant room for improvement in customer satisfaction. Specifically, the company has the opportunity to convert lower ratings (1s and 2s) into mid-to-high ratings (3 and above) through improved task execution and service quality.

3) How are you going to close any gaps in the data?
To address contextual data gaps, I plan to enhance the dataset by creating two new columns—‘Complexity Level’ and ‘Equipment Trained’—derived from the ‘Expertise Match’ column. This will add greater detail and context about the specific skills technicians have demonstrated through their completed tasks, enabling a more accurate calculation of expertise match after algorithm implementation and capturing important nuances in assignment quality.

For the success metric related to penalty costs, current data is available only for unassigned tasks. To provide a comprehensive and comparable metric, I will predict penalty costs for all historical tasks by leveraging patterns from the unassigned task table, allowing for a more complete and meaningful assessment of total penalty costs.

5) How is it going to affect your timelines, requirements, and scope? Identify any risks and the strategies that you will adopt to mitigate it
The process of deriving new columns from existing data required careful planning and coding, which posed initial challenges. By anticipating these needs and starting early, I have kept the project on track and within scope. A primary risk is that my proof of concept could introduce bias into key metrics if the new features do not fully reflect assignment complexity. To mitigate this, I will conduct sensitivity analyses to assess and address the impact of any assumptions.

Additionally, I initially expected penalty cost calculations to be complex, but after analyzing the data and visualizations, I found the process to be more straightforward. While this streamlines the analysis, it raises concerns about the representativeness of the data, as it may be synthetically generated rather than grounded in operational feedback. To address this, I will thoroughly document all assumptions and test the robustness of my findings using alternative penalty cost models.





post the proposed data model diagram (ERD, Dimensional, or both - whatever you have that approximates the data model), and provide the reasoning behind selecting the data model process i.e. relational, or dimensional, NoSQL, etc. Also provide any assumptions that you may have made due to the EDA.

reasoning:
I utlized a relational data model for my database. There are two primary entities in this project scope which are technicians and tasks with a clear, structured relationship between them. Technicians work on their assigned tasks. Within the given task data, there is also a clear separation of task status that is one that were already assigned and completed and those that needs to be assigned. By differentiating between historical_task (assigned/completed) and unassigned_task, the model allows you to easily track which tasks have been addressed and which are pending, supporting efficient workflow and assignment processes. Also having a separate centralized table for technicians also avoids data duplication and ensures consistency when referencing technicians across assigned and unassigned tasks. The relationships between tables enable quick queries to determine which technician worked on which tasks and what kind of skills do technicians have and what characteristics describe the tasks. Using primary and foreign keys also ensures that every task and technician is uniquely identified and that task-to-technician relationships are valid, preventing orphan records and ensuring reliable data analytics.

Assumptions:
Expertise Matching:
Technicians are assigned to tasks based on their equipment training and qualifications. A technician is considered qualified for a task if their expertise level is equal to or greater than the task’s complexity.

Task Priority Definition:
Lower-priority tasks are assumed to be routine in nature, while higher-priority tasks are more complex and require greater expertise.

Accuracy of Training Data:
The training data used in this analysis accurately represents historical work patterns and outcomes.

Technician Availability:
There is sufficient availability of appropriately trained technicians to meet the demand for all tasks.

Customer Rating Calculation:
The calculated customer rating reliably reflects actual customer behavior and satisfaction trends observed in the telecom industry.

Penalty Cost Estimation:
The calculated penalty cost accurately represents the real-world financial impact incurred from task delays.

Task Complexity and Equipment Data:
While “task complexity” and “equipment required” columns in historical_tasks were merged from the unassigned task dataset, and they are assumed to be accurate descriptions of real-life tasks.
