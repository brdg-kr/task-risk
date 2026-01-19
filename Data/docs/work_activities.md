# Work Activities

* [Excel](/dictionary/30.1/excel/work_activities.html)
* [Text](/dictionary/30.1/text/work_activities.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/work_activities.html)
* [Oracle](/dictionary/30.1/oracle/work_activities.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to Work Activity ratings. |
| **Table Name:** | work_activities |
| **Download:** | [19_work_activities.sql](/dl_files/database/db_30_1_mysql/19_work_activities.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| data_value | Decimal(5,2) | Rating associated with the O*NET-SOC occupation |
| n | Decimal(4,0) | Sample size |
| standard_error | Decimal(7,4) | Standard Error |
| lower_ci_bound | Decimal(7,4) | Lower 95% confidence interval bound |
| upper_ci_bound | Decimal(7,4) | Upper 95% confidence interval bound |
| recommend_suppress | Character(1) | Low precision indicator (Y=yes, N=no) |
| not_relevant | Character(1) | Not relevant for the occupation (Y=yes, N=no) |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains the Content Model Work Activity data associated with each O*NET-SOC occupation. It is displayed in 12 tab delimited fields and identified using the column names provided above. Item rating level metadata is provided in columns named n, standard_error, lower_ci_bound, upper_ci_bound, recommend_suppress, not_relevant, date_updated, and domain_source. Refer to **[Appendix 2, *Item Rating Level Statistics - Incumbent*](appendix_incumbent.html "Appendix 2. Item Rating Level Statistics - Incumbent")** for additional information on these items. The 12 fields are represented by one row. There are a total of 73,308 rows of data in this file.

For more information, see:
* [O*NET Work Activities Project Technical Report](https://www.onetcenter.org/reports/DWA_2014.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Date and Source columns added |
| 5.1 | Columns added for N, Standard Error, Lower CI Bound, Upper CI Bound, Recommend Suppress, and Not Relevant |
| 6.0 - 28.1 | No structure changes |
| 28.2 | Standard Error, Lower CI Bound, Upper CI Bound expanded from 2 decimal places to 4 |
| 28.3 - 30.1 | No structure changes |

### Data Example - work_activities:

| onetsoc_code | element_id | scale_id | data_value | n | standard_error | lower_ci_bound | upper_ci_bound | recommend_suppress | not_relevant | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 17-2121.00 | 4.A.1.a.1 | IM | 4.22 | 18 | NULL | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.a.1 | LV | 5.17 | 18 | NULL | NULL | NULL | NULL | N | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.a.2 | IM | 3.12 | 17 | NULL | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.a.2 | LV | 3.94 | 17 | NULL | NULL | NULL | NULL | N | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.b.1 | IM | 3.83 | 18 | NULL | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.b.1 | LV | 5.00 | 18 | NULL | NULL | NULL | NULL | N | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.b.2 | IM | 3.76 | 17 | NULL | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.b.2 | LV | 4.35 | 17 | NULL | NULL | NULL | NULL | N | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.b.3 | IM | 3.17 | 18 | NULL | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.1.b.3 | LV | 3.89 | 18 | NULL | NULL | NULL | NULL | N | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.2.a.1 | IM | 3.17 | 18 | NULL | NULL | NULL | NULL | NULL | 2025-08-01 | Occupational Expert |
| 17-2121.00 | 4.A.2.a.1 | LV | 3.94 | 18 | NULL | NULL | NULL | NULL | N | 2025-08-01 | Occupational Expert |