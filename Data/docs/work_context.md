# Work Context

* [Excel](/dictionary/30.1/excel/work_context.html)
* [Text](/dictionary/30.1/text/work_context.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/work_context.html)
* [Oracle](/dictionary/30.1/oracle/work_context.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to Work Context ratings. |
| **Table Name:** | work_context |
| **Download:** | [20_work_context.sql](/dl_files/database/db_30_1_mysql/20_work_context.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| category | Decimal(3,0) | Percent frequency category *(see [*Work Context Categories*](work_context_categories.html "Work Context Categories"))* |
| data_value | Decimal(5,2) | Rating associated with the O*NET-SOC occupation |
| n | Decimal(4,0) | Sample size |
| standard_error | Decimal(7,4) | Standard Error |
| lower_ci_bound | Decimal(7,4) | Lower 95% confidence interval bound |
| upper_ci_bound | Decimal(7,4) | Upper 95% confidence interval bound |
| recommend_suppress | Character(1) | Low precision indicator (Y=yes, N=no) |
| not_relevant | Character(1) | Not relevant for the occupation (Y=yes, N=no) |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains the Content Model Work Context data associated with each O*NET-SOC occupation. It is displayed in 13 tab delimited fields and identified using the column names provided above. Item rating level metadata is provided in columns named n, standard_error, lower_ci_bound, upper_ci_bound, recommend_suppress, not_relevant, date_updated, and domain_source. Refer to **[Appendix 2, *Item Rating Level Statistics - Incumbent*](appendix_incumbent.html "Appendix 2. Item Rating Level Statistics - Incumbent")** for additional information on these items. The 13 fields are represented by one row. There are a total of 297,676 rows of data in this file.

The column named Data Value provides both the mean rating (indicated by the value CX in the Scale ID column) and the percent of respondents endorsing each category (indicated by CXP in the Scale ID column).

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Date and Source columns added |
| 5.1 | Columns added for N, Standard Error, Lower CI Bound, Upper CI Bound, Recommend Suppress, and Not Relevant |
| 6.0 - 28.1 | No structure changes |
| 28.2 | Standard Error, Lower CI Bound, Upper CI Bound expanded from 2 decimal places to 4 |
| 28.3 - 30.1 | No structure changes |

### Data Example - work_context:

| onetsoc_code | element_id | scale_id | category | data_value | n | standard_error | lower_ci_bound | upper_ci_bound | recommend_suppress | not_relevant | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 47-2141.00 | 4.C.3.d.8 | CT | NULL | 1.99 | 20 | 0.2281 | 1.5163 | 2.4712 | N | NULL | 2025-08-01 | Incumbent |
| 47-2141.00 | 4.C.3.d.8 | CTP | 1 | 17.03 | 20 | 17.7643 | 1.4564 | 74.0353 | Y | NULL | 2025-08-01 | Incumbent |
| 47-2141.00 | 4.C.3.d.8 | CTP | 2 | 66.56 | 20 | 23.7009 | 17.6484 | 94.8695 | Y | NULL | 2025-08-01 | Incumbent |
| 47-2141.00 | 4.C.3.d.8 | CTP | 3 | 16.41 | 20 | 15.0155 | 1.9455 | 65.9997 | Y | NULL | 2025-08-01 | Incumbent |