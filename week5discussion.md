1) Provide the techniques you used as a team to do the Exploratory Data Analysis.
Crosstabulation:
I used crosstabs to display the relationship and total counts between two categorical variables, such as expertise match versus task completion status. This helped me quickly identify patterns and associations in the data.

Scatterplots:
Scatterplots were employed to visualize trends and potential correlations between two variables, such as penalty costs and task priority.

Groupby Descriptive Statistics:
By grouping data and calculating descriptive statistics (like min, max, mean, and standard deviation), i gained insights into the range and central tendencies of penalty costs across different task priority level.

Box and Whisker Plots:
These plots allowed us to examine the distribution, spread, and presence of outliers within groups, such as penalty costs or customer ratings by expertise match.

Bar Graphs:
Bar graphs provided an effective way to compare rates or averages across categories, such as expertise match rates or customer rating by task completed or priority level.


2) What did you discover  so far in your data? (Be specific and relate it to your project objective. Did it help you further refine or pivot your hypotheses? Did it point to additional or alternative data or questions?)

finding 1: 
The crosstab analysis shows that when expertise is matched, a higher number of tasks are completed successfully, supporting the hypothesis that aligning technician expertise with task requirements increases the likelihood of successful task completion. Interestingly, among the incomplete tasks, there are still more instances where expertise was matched than not. This may suggest that technicians are sometimes assigned tasks that are either too easy or too complex relative to their actual capabilities. Due to the lack of contextual data, it is difficult to draw definitive conclusions. Nonetheless, the overall trend indicates that expertise matching remains a positive factor, even if its impact alone is not strongly significant in this dataset.

finding 2:
Our analysis showed that tasks matched by expertise tend to have higher associated penalty costs. This reflects the company's practice of assigning high-priority, higher-risk tasks to technicians with matching expertise to minimize operational risk. It reveals that penalty cost and expertise match are capturing different dimensions of success: the former measures operational efficiency and risk, while the latter reflects the quality of task assignment. Comparing penalty costs and completion rates within the same priority levels could further clarify the true impact of expertise matching. For lower-priority tasks, expertise matching reduces penalty costs, while for higher-priority tasks, costs remain high due to inherent complexity, not technician mismatch.

finding 3: 
The spread of customer ratings is higher for completed tasks compared to those not completed, indicating that customers have more positive experiences when tasks are successfully completed. This suggests that the company should prioritize improving task completion rates, as it directly contributes to higher customer satisfaction.

finding 4: 
The distribution of Customer Ratings is relatively even across all levels, indicating that there is significant room for improvement in customer satisfaction. Specifically, the company has the opportunity to convert lower ratings (1s and 2s) into mid-to-high ratings (3 and above) through improved task execution and service quality.

3) How are you going to close any gaps in the data?
New Feature Engineering:
I plan to create two new columns—'Complexity Level' and 'Equipment Trained'—derived from the current 'Expertise Match' column. This will enable us to more precisely calculate expertise match after algorithm implementation and capture nuances in assignment quality.

Refined Success Metrics:
I will calculate total penalty cost within a unified dataset to provide a comprehensive, comparable success metric across all tasks and assignment types.

4) How is it going to affect your timelines, requirements, and scope? Identify any risks and the strategies that you will adopt to mitigate it
Timelines and Requirements:
The process of logically deriving new columns from existing data required thoughtful planning and coding, which initially posed a challenge. However, because I anticipated this need and started early, I have remained on track with the project timeline.
There is a risk that my proof of concept could introduce bias into the final metrics, particularly if the new features do not fully capture the intended assignment complexity. To mitigate this, I will validate the derived columns with domain experts and use sensitivity analysis to assess the impact of any assumptions.


Initially, I expected calculating penalty costs to be complex and potentially inaccurate. However, upon reviewing the underlying data and visualizations, it became clear that the calculation is relatively straightforward. While this simplifies analysis, it also raises concerns about the data’s representativeness, as it may be generated rather than based on real operational feedback. To mitigate this risk, I will document all assumptions, test the robustness of findings under different penalty cost formulations, and, if possible, seek additional real-world data for validation.





post the proposed data model diagram (ERD, Dimensional, or both - whatever you have that approximates the data model), and provide the reasoning behind selecting the data model process i.e. relational, or dimensional, NoSQL, etc. Also provide any assumptions that you may have made due to the EDA.

reasoning:
there is a clear, structured relationship between technicians table and tasks table. technicians are assigned tasks ; their skills and training are attributes. The relational model also enforces consistency by making sure every task must be assigned to a valid technician. It allows for essy to run queries like: “Which tasks has a technician completed?” or “Which technicians have the right skills for a new task?”
Assumption:
1. expertise match relies on the fact that ept trained tech are matched with eqpt required tasks and the techs are qualified for the task based on its complexity. 
2. training data are accurately reflects historical data
3. Assumes that there is sufficient availability of appropriately trained technicians to meet demand.
