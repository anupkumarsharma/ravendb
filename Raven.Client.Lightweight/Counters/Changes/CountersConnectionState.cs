﻿using System;
using System.Threading.Tasks;
using Raven.Abstractions.Counters.Notifications;
using Raven.Client.Changes;

namespace Raven.Client.Counters.Changes
{
    public class CountersConnectionState : IChangesConnectionState
    {
        private readonly Action onZero;
        private readonly Task task;
        private int value;
        public Task Task
        {
            get { return task; }
        }

		public CountersConnectionState(Action onZero, Task task)
        {
            value = 0;
            this.onZero = onZero;
            this.task = task;
        }

        public void Inc()
        {
            lock (this)
            {
                value++;
            }
        }

        public void Dec()
        {
            lock (this)
            {
                if (--value == 0)
                    onZero();
            }
        }

		public event Action<ChangeNotification> OnChangeNotification = (x) => { };
		public void Send(ChangeNotification changeNotification)
        {
			var onCounterChangeNotification = OnChangeNotification;
			if (onCounterChangeNotification != null)
				onCounterChangeNotification(changeNotification);
        }

		public event Action<StartingWithNotification> OnCountersStartingWithNotification = (x) => { };
		public void Send(StartingWithNotification changeNotification)
		{
			var onCounterChangeNotification = OnCountersStartingWithNotification;
			if (onCounterChangeNotification != null)
				onCounterChangeNotification(changeNotification);
		}

		public event Action<InGroupNotification> OnCountersInGroupNotification = (x) => { };
		public void Send(InGroupNotification changeNotification)
		{
			var onCounterChangeNotification = OnCountersInGroupNotification;
			if (onCounterChangeNotification != null)
				onCounterChangeNotification(changeNotification);
		}

		public event Action<BulkOperationNotification> OnBulkOperationNotification = (x) => { };
		public void Send(BulkOperationNotification bulkOperationNotification)
        {
			var onBulkOperationNotification = OnBulkOperationNotification;
			if (onBulkOperationNotification != null)
				onBulkOperationNotification(bulkOperationNotification);
        }

        public event Action<Exception> OnError;

        public void Error(Exception e)
        {
            var onOnError = OnError;
            if (onOnError != null)
                onOnError(e);
        }
    }
}
