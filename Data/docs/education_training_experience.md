# Education, Training, and Experience

* [Excel](/dictionary/30.1/excel/education_training_experience.html)
* [Text](/dictionary/30.1/text/education_training_experience.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/education_training_experience.html)
* [Oracle](/dictionary/30.1/oracle/education_training_experience.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to Education, Training, and Experience ratings. |
| **Table Name:** | education_training_experience |
| **Download:** | [12_education_training_experience.sql](/dl_files/database/db_30_1_mysql/12_education_training_experience.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| category | Decimal(3,0) | Percent frequency category *(see [*Education, Training, and Experience Categories*](ete_categories.html "Education, Training, and Experience Categories"))* |
| data_value | Decimal(5,2) | Rating associated with the O*NET-SOC occupation |
| n | Decimal(4,0) | Sample size |
| standard_error | Decimal(7,4) | Standard Error |
| lower_ci_bound | Decimal(7,4) | Lower 95% confidence interval bound |
| upper_ci_bound | Decimal(7,4) | Upper 95% confidence interval bound |
| recommend_suppress | Character(1) | Low precision indicator (Y=yes, N=no) |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains the percent frequency data associated with Education, Training, and Experience Content Model elements. It is displayed in 12 tab delimited fields and identified using the column names provided above. Item rating level metadata is provided in columns named n, standard_error, lower_ci_bound, upper_ci_bound, recommend_suppress, date_updated, and domain_source. Refer to **[Appendix 2, *Item Rating Level Statistics - Incumbent*](appendix_incumbent.html "Appendix 2. Item Rating Level Statistics - Incumbent")** for additional information on these items. The 12 fields are represented by one row. There are a total of 37,125 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Added as a new file |
| 5.1 | Columns added for N, Standard Error, Lower CI Bound, Upper CI Bound, and Recommend Suppress |
| 6.0 - 28.1 | No structure changes |
| 28.2 | Standard Error, Lower CI Bound, Upper CI Bound expanded from 2 decimal places to 4 |
| 28.3 - 30.1 | No structure changes |

### Data Example - education_training_experience:

| onetsoc_code | element_id | scale_id | category | data_value | n | standard_error | lower_ci_bound | upper_ci_bound | recommend_suppress | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 33-9011.00 | 2.D.1 | RL | 1 | 0.00 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 2 | 65.38 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 3 | 19.23 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 4 | 0.00 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 5 | 11.54 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 6 | 3.85 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 7 | 0.00 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 8 | 0.00 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 9 | 0.00 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 10 | 0.00 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 11 | 0.00 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 33-9011.00 | 2.D.1 | RL | 12 | 0.00 | 26 | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |