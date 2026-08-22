# Edge Cases & Error Handling

Whatcha Got? is designed not only around the ideal meal-discovery flow but also around situations where the user has incomplete input, no suitable results, temporary failures, or limited connectivity. These states help keep the experience understandable and recoverable instead of leaving the user at a dead end.

| Edge Case / State | Design Response |
| :--- | :--- |
| **Zero Search Results** | Show alternative meal suggestions or encourage the user to adjust their ingredients/preferences. |
| **Loading** | Use a skeleton/loading state to communicate that results are being prepared. |
| **Error** | Display a clear error message/toast with a Retry action so the user can recover without restarting the flow. |
| **Success** | Provide clear confirmation when an action has been completed successfully. |
| **404 / Missing Content** | Show a recovery state with relevant actions such as going back, returning home, or trying another meal. |
| **Overflow Menu** | Keep secondary recipe actions inside an overflow menu so the primary recipe experience remains uncluttered. |
| **Long Content** | Use controlled text overflow and structured content areas to prevent long recipe information from breaking the layout. |
| **Notification / Feedback** | Use lightweight overlay feedback to communicate temporary status or completed actions without interrupting the main flow. |
| **Offline** | Provide an offline state that clearly communicates the connectivity limitation and, where applicable, allows users to access available saved/offline content. |
| **Form Error** | Provide field-level validation so users can immediately understand what input needs to be corrected. |
